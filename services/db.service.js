import { MongoClient } from 'mongodb'

import { config } from '../config/index.js'
import { loggerService } from './logger.service.js'


export const dbService = {
    getCollection,
}


var dbConnection = null


async function getCollection(collectionName) {
    try {
        const db = await _connect()
        return await db.collection(collectionName)
    } catch (err) {
        loggerService.error('Failed to get MongoDB collection', err)
        throw err
    }
}

async function _connect() {
    if (dbConnection) return dbConnection
    try {
        const client = await MongoClient.connect(config.dbURL)
        return dbConnection = client.db(config.dbName)
    } catch (err) {
        loggerService.error('Cannot connect to DB', err)
        throw err
    }
}