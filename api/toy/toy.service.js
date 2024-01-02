import { ObjectId } from 'mongodb'

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
    try {
        var toyCollection = await dbService.getCollection('toy')
    } catch (err) {
        loggerService.error('Cannot get toy collection: ', err)
        throw err
    }
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
            .toArray()
        return getPage(toys, pageInfo)
    } catch (err) {
        loggerService.error('Cannot get toys: ', err)
        throw err
    }
}

function getFilterCriteria(filterBy) {
    if (! filterBy) return {}
    const filterCriteria = {}
    if (filterBy.stock === 'yes') filterCriteria.stock = { $ne: 0 }
    else if (filterBy.stock === 'no' ) filterCriteria.stock = 0
    const textRegex = { $regex: filterBy.text || '', $options: 'i' }
    filterCriteria.$or = [{ name: textRegex }, { description: textRegex }]
    if (filterBy.labels?.length) filterCriteria.labels = { $in: filterBy.labels || [] }
    return filterCriteria
}

function getSortCriteria(sortBy) {
    if (! sortBy) return {}
    const { field, isAscending } = sortBy
    const sortOrder = isAscending ? 1 : -1
    return { [field]: sortOrder }
}

function getPage(toys, pageInfo) {
    if (! pageInfo) return { toys, pageNum: 1, lastPageNum: 1 }
    if (! pageInfo.pageNum || ! pageInfo.toysPerPage) {
        var toyPage = {
            resultsNum: toys.length,
            toys,
            pageNum: 1,
            lastPageNum: 1,
        }
    } else {
        const toysPerPage = pageInfo.toysPerPage
        const lastPageNum = Math.ceil(toys.length / toysPerPage) || 1
        const pageNum = Math.min(Math.max(pageInfo.pageNum, 1), lastPageNum)
        const startIdx = (pageNum - 1) * toysPerPage
        const endIdx = startIdx + toysPerPage
        var toyPage = {
            resultsNum: toys.length,
            toys: toys.slice(startIdx, endIdx),
            pageNum,
            lastPageNum,
        }
    }
    return toyPage
}

async function get(toyId) {
    try {
        const toyCollection = await dbService.getCollection('toy')
        const toy = await toyCollection.findOne({ _id: new ObjectId(toyId) })
        return toy
    } catch (err) {
        loggerService.error(`Cannot get toy with id='${toyId}': `, err)
        throw err
    }
}

async function save(toy) {
    try {
        var toyCollection = await dbService.getCollection('toy')
    } catch (err) {
        loggerService.error('Cannot get toy collection: ', err)
        throw err
    }
    if (toy._id) {
        try {
            var toyToEdit = await get(toy._id)
        } catch (err) {
            loggerService.error('Cannot update toy: ', err)
            throw err
        }
        if (! toyToEdit) return Promise.reject('No such toy')
        if (toy.stockDiff) {
            toyToEdit.stock += toy.stockDiff
        }
        else for (let [key, value] of Object.entries(toy)) {
            if (value || value === 0) toyToEdit[key] = value
        }
        delete toyToEdit._id
        try {
            var res = await toyCollection.updateOne({ _id: new ObjectId(toy._id) }, { $set: toyToEdit })
            if (! res.acknowledged) throw new Error('Did not acknowledge')
        } catch (err) {
            loggerService.error('Cannot update toy: ', err)
            throw err
        }
        toyToEdit._id = toy._id
        return toyToEdit
    } else {
        const newToy = _getNewToy()
        for (let [key, value] of Object.entries(toy)) {
            if (value) newToy[key] = value
        }
        toy = newToy
        try {
            var res = await toyCollection.insertOne(toy)
            if (! res.acknowledged) throw new Error('Did not acknowledge')
        } catch (err) {
            loggerService.error('Cannot insert toy: ', err)
            throw err
        }
        toy._id = res.insertedId
        return toy
    }
}

async function remove(toyId) {
    try {
        const toyCollection = await dbService.getCollection('toy')
        var toy = await toyCollection.findOne({ _id: new ObjectId(toyId) })
        if (! toy) throw new Error('No such toy')
        const res = await toyCollection.deleteOne({ _id: new ObjectId(toyId) })
        if (! res.deletedCount) throw new Error('Did not delete')
    } catch (err) {
        loggerService.error(`Cannot remove toy with id='${toyId}: '`, err)
        throw err
    }
    return toy
}

async function getAllLabels() {
    try {
        var toys = await query()
        return Array.from(new Set(toys.map(toy => toy.labels).flat())).sort((l1, l2) => l1.localeCompare(l2))
    } catch (err) {
        loggerService.error('Cannot get all albels: ', err)
    }
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