import { utilService } from './util.service.js'
import { defaultToys } from '../default/toys.js'

const DATA_DIR = './data'
const TOYS_PATH = `${DATA_DIR}/toys.json`

export const toyService = {
    query,
    get,
    save,
    remove,
}

var prmToys = _loadToys()

function _loadToys() {
    return utilService.loadFromFile(DATA_DIR, TOYS_PATH, () => defaultToys)
}

function _saveToys() {
    return prmToys.then(toys => utilService.saveToFile(DATA_DIR, TOYS_PATH, toys))
}

function query(filterBy, sortBy, pageInfo) {
    return prmToys.then(toys => {
            if (! toys || toys.length === 0) {
                prmToys = _loadToys()
                return prmToys
            }
            return toys
        })
        .then(toys => filter(toys, filterBy))
        .then(toys => sort(toys, sortBy))
        .then(toys => getPage(toys, pageInfo))
        .catch(err => console.error(err) || Promise.reject(err))
}

function filter(toys, filterBy) {
    if (! filterBy) return toys
    return toys.filter(toy => {
        const { name, description, labels } = toy
        const text =                filterBy.text ? RegExp(filterBy.text, 'i') : null
        const isTextInName =        ! text || text.test(name)
        const isTextInDescription = ! text || text.test(description)
        const isTextInLabels =      ! text || labels.some(label => text.test(label))
        return isTextInName || isTextInDescription || isTextInLabels
    })
}

function sort(toys, sortBy) {
    if (! sortBy) return toys
    const { field, isAscending } = sortBy
    if (! field || typeof isAscending !== 'boolean') return  toys
    const dirMult = isAscending ? 1 : -1
    return toys.sort((toy1, toy2) => {
        switch (field) {
            case 'name':
            case 'description': return toy1[field].localeCompare(toy2[field]) * dirMult
            case 'price': return (toy1[field] - toy2[field]) * dirMult
        }
    })
}

function getPage(toys, pageInfo) {
    if (! pageInfo) return toys
    let idx = pageInfo.idx || 0
    const toysPerPage = pageInfo.toysPerPage || toys.length
    const lastPage = Math.ceil(toys.length / toysPerPage) || 1
    const startIdx = idx * toysPerPage
    const endIdx = startIdx + toysPerPage
    const isLastPage = (toys.length === 0) || lastPage <= idx + 1
    return [toys.slice(startIdx, endIdx), isLastPage, lastPage]
}

function get(toyId) {
    return query().then(toys => {
            const toy = toys.find(toy => toy._id === toyId)
            if (! toy) return Promise.reject('No such toy')
            return toy
        })
}

function save(toy, loggedInUser) {
    if (! loggedInUser.isAdmin) return Promise.reject('Not admin')
    return query().then(toys => {
            if (toy._id) {
                const toyIdx = toys.findIndex(_toy => _toy._id === toy._id)
                if (toyIdx < 0) return Promise.reject('No such toy')
                const toyToEdit = toys[toyIdx]
                console.log(toy)
                for (let [key, value] of Object.entries(toy)) {
                    if (value) toyToEdit[key] = value
                }
                toy = toyToEdit
            } else {
                const newToy = getNewToy()
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

function remove(toyId, loggedInUser) {
    if (! loggedInUser.isAdmin) return Promise.reject('Not admin')
    return query().then(toys => {
            const toyIdx = toys.findIndex(toy => toy._id === toyId)
            if (toyIdx < 0) return Promise.reject('No such toy')
            const toy = toys[toyIdx]
            toys.splice(toyIdx, 1)
            return _saveToys(toys).then(() => toy)
        })
}

function getNewToy() {
    return {
        name: '',
        description: '',
        labels: [],
    }
}