import fs from 'fs/promises'

export const loggerService = {
    debug:  (...args) => logToFile('DEBUG', ...args),
    info:   (...args) => logToFile('INFO', ...args),
    warn:   (...args) => logToFile('WARN', ...args),
    error:  (...args) => logToFile('ERROR', ...args),
}

const LOGS_DIR = './logs'
const LOG_PATH = `${LOGS_DIR}/backend-${new Date().toISOString()}.log`

function logToFile(level, ...args) {
    const strs = args.map(arg => {
        if (typeof arg === 'string' || isError(arg)) return arg
        else return JSON.stringify(arg)
    })
    const message = `${getTime()} - ${level} - ${strs.join(' | ')}`
    console.log(message)
    return fs.stat(LOGS_DIR)
        .catch(() => fs.mkdir(LOGS_DIR))
        .then(() => fs.appendFile(LOG_PATH, message, 'utf-8'))
}

function isError(arg) {
    return arg && arg.stack && arg.message
}

function getTime() {
    return new Date().toLocaleString('he')
}