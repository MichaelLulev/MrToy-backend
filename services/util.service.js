import fs from 'fs'
import fsprm from 'fs/promises'
import { loggerService } from './logger.service.js'

export const utilService = {
    makeId,
    getRandInt,
    loadFromFile,
    saveToFile,
}

function makeId(length = 8) {
    var id = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        id += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return id
}

function getRandInt(max, min=0) {
    return Math.floor(Math.random() * (max - min) + min)
}

function loadFromFile(dir, path, elementsCreator) {
    return fsprm.readFile(path, 'utf-8')
        .then(res => {
            let elements = JSON.parse(res)
            if (! elements || elements.length === 0) return Promise.reject('No elements in path ' + path)
            return elements
        })
        .catch(err => {
            loggerService.info('Creating elements')
            const elements = elementsCreator()
            return saveToFile(dir, path, elements).then(() => elements)
        })
}

function saveToFile(dir, path, elements=[]) {
    loggerService.info('Saving elements to path ' + path)
    const strElements = JSON.stringify(elements, null, '\t')
    // return fsprm.stat(dir)
    //     .catch(() => fsprm.mkdir(dir))
    //     .then(() => fsprm.writeFile(path, strElements, 'utf-8'))
    try {
        fs.statSync(dir)
    } catch (err) {
        fs.mkdirSync(dir)
    }
    return fsprm.writeFile(path, strElements, 'utf-8')
}