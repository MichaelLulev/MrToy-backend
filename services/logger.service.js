import fs from 'fs'
import fsprm from 'fs/promises'

export const loggerService = {
    debug:  (...args) => logToFile('DEBUG', ...args),
    info:   (...args) => logToFile('INFO', ...args),
    warn:   (...args) => logToFile('WARN', ...args),
    error:  (...args) => logToFile('ERROR', ...args),
}

const LOG_DIR = './logs'
const LOG_PATH = `${LOG_DIR}/${new Date().toISOString().split('T')[0]}.log`

function logToFile(level, ...args) {
    const strs = args.map(arg => {
        if (typeof arg === 'string' || isError(arg)) return arg
        else return JSON.stringify(arg)
    })
    const message = `${getTime()} - ${level} - ${strs.join(' | ')}`
    console.log(message)
    // return fsprm.stat(LOG_DIR)
    //     .catch(() => fsprm.mkdir(LOG_DIR))
    //     .then(() => fsprm.appendFile(LOG_PATH, message, 'utf-8'))
    try {
        fs.statSync(LOG_DIR)
    } catch (err) {
        fs.mkdirSync(LOG_DIR)
    }
    return fsprm.appendFile(LOG_PATH, message + '\n', 'utf-8')
}

function isError(arg) {
    return arg && arg.stack && arg.message
}

function getTime() {
    return new Date().toLocaleString('he')
}