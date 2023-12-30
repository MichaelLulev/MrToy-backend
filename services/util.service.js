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
    const possible = getCharRange('A', 'Z') + getCharRange('a', 'z') + getCharRange('0', '9')
    var id = ''
    for (var i = 0; i < length; i++) {
        id += getRandomChar(possible)
    }
    return id
}

function getRandomChar(string) {
    const randIdx = getRandInt(string.length)
    return string.charAt(randIdx)
}

function getCharRange(startChar, endChar) {
    let charRange = ''
    for (let i = startChar.charCodeAt(0); i <= endChar.charCodeAt(0); i++) {
        charRange += String.fromCharCode(i)
    }
    return charRange
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
            return saveToFile(dir, path, elements)
        })
}

function saveToFile(dir, path, elements=[]) {
    loggerService.info('Saving elements to path ' + path)
    const strElements = JSON.stringify(elements, null, '\t')
    try {
        fs.statSync(dir)
    } catch (err) {
        fs.mkdirSync(dir)
    }
    return fsprm.writeFile(path, strElements, 'utf-8').then(() => elements)
}