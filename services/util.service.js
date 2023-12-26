import fs from 'fs/promises'

export const utilService = {
    makeId,
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

function loadFromFile(dir, path, elementsCreator) {
    return fs.readFile(path, 'utf-8')
        .then(res => {
            let elements = JSON.parse(res)
            if (! elements || elements.length === 0) return Promise.reject('No elements in path ' + path)
            return elements
        })
        .catch(err => {
            console.log('Creating elements')
            const elements = elementsCreator()
            return saveToFile(dir, path, elements).then(() => elements)
        })
}

function saveToFile(dir, path, elements=[]) {
    console.log('Saving elements to path ' + path)
    const strElements = JSON.stringify(elements, null, '\t')
    return fs.stat(dir)
        .catch(() => fs.mkdir(dir))
        .then(() => fs.writeFile(path, strElements, 'utf-8'))
}