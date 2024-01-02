import { ObjectId } from 'mongodb'

import { utilService } from '../../services/util.service.js'
import { loggerService } from '../../services/logger.service.js'
import { dbService } from '../../services/db.service.js'
import { getDefaultToys } from '../../default/toys.js'


export const toyService = {
    query,
    get,
    save,
    remove,
    getAllLabels,
}


async function query(filterBy, sortBy, pageInfo) {
    const toyCollection = await dbService.getCollection('toy')
    if (await toyCollection.countDocuments() === 0) {
        loggerService.info('No toys: Creating toys')
        try {
            await toyCollection.insertMany(getDefaultToys())
        } catch (err) {
            loggerService.error('Cannot create toys: ' + err)
        }
    }
    try {
        const toys = await toyCollection
            .find(getFilterCriteria(filterBy))
            .sort(getSortCriteria(sortBy))
            .limit(getPageCriteria(pageInfo))
            .toArray()
        return toys
    } catch (err) {
        loggerService.error('Cannot find toys: ', err)
        throw err
    }
}

function getFilterCriteria(filterBy) {
    if (! filterBy) return {}
    const filterCriteria = {}
    if (filterBy.stock === 'yes') filterCriteria.stock = { $ne: 0 }
    else if (filterBy.stock === 'no' ) filterCriteria.stock = 0
    const textRegex =                { $regex: filterBy.text, $options: 'i' }
    filterCriteria.$or = [{ name: textRegex }, { description: textRegex }]
    filterCriteria.labels = { $in: filterBy.labels }
    return filterCriteria
}

function sort(toys, sortBy) {
    if (! sortBy) return toys
    const { field, isAscending } = sortBy
    const dirMult = isAscending ? 1 : -1
    return toys.sort((toy1, toy2) => {
        switch (field) {
            case 'name':
            case 'description': return toy1[field].localeCompare(toy2[field]) * dirMult
            case 'price': 
            case 'stock': return (toy1[field] - toy2[field]) * dirMult
        }
    })
}

function getPage(toys, pageInfo) {
    if (! pageInfo) return { toys, pageNum: 1, lastPageNum: 1 }
    const toysPerPage = pageInfo.toysPerPage
    const lastPageNum = Math.ceil(toys.length / toysPerPage) || 1
    const pageNum = Math.min(Math.max(pageInfo.pageNum, 1), lastPageNum)
    const startIdx = (pageNum - 1) * toysPerPage
    const endIdx = startIdx + toysPerPage
    const toyPage = {
        resultsNum: toys.length,
        toys: toys.slice(startIdx, endIdx),
        pageNum,
        lastPageNum,
    }
    return toyPage
}

function get(toyId) {
    return query().then(({ toys }) => {
            const toy = toys.find(toy => toy._id === toyId)
            if (! toy) return Promise.reject('No such toy')
            return toy
        })
}

function save(toy) {
    return query().then(({ toys }) => {
            if (toy._id) {
                const toyIdx = toys.findIndex(_toy => _toy._id === toy._id)
                if (toyIdx < 0) return Promise.reject('No such toy')
                const toyToEdit = toys[toyIdx]
                if (toy.stockDiff) {
                    toyToEdit.stock += toy.stockDiff
                }
                else for (let [key, value] of Object.entries(toy)) {
                    if (value || value === 0) toyToEdit[key] = value
                }
                toy = toyToEdit
            } else {
                const newToy = _getNewToy()
                for (let [key, value] of Object.entries(toy)) {
                    if (value) newToy[key] = value
                }
                newToy._id = utilService.makeId()
                toys.unshift(newToy)
                toy = newToy
            }
            return _saveToys(toys).then(() => toy)
        })
}

function remove(toyId) {
    return query().then(({ toys }) => {
            const toyIdx = toys.findIndex(toy => toy._id === toyId)
            if (toyIdx < 0) return Promise.reject('No such toy')
            const toy = toys[toyIdx]
            toys.splice(toyIdx, 1)
            return _saveToys(toys).then(() => toy)
        })
}

function getAllLabels() {
    return query().then(({ toys }) => {
        return Array.from(new Set(toys.map(toy => toy.labels).flat())).sort((l1, l2) => l1.localeCompare(l2))
    })
}

function _getNewToy() {
    return {
        name: '',
        description: '',
        price: 0,
        stock: 0,
        labels: [],
    }
}