import { ObjectId } from 'mongodb'

import { dbService } from '../../services/db.service.js'
import { loggerService } from '../../services/logger.service.js'


const USER_COLLECTION = 'user'


export const userService = {
    query,
    getById,
    getByUsername,
    add,
    update,
    checkLogin,
    getLoginToken,
    validateLoginToken,
}


async function query() {
    try {
        const users = await dbService.getCollection(USER_COLLECTION).toArray()
        return users.map(user => {
            delete user.password
            return user
        })
    } catch (err) {
        loggerService.error('Cannot query users:', err)
        throw err
    }
}

async function add(user) {
    try {
        if (await getByUsername(user.username)) throw new Error('User already exists')
        if (! user.fullName) var message = 'Missing full name'
        else if (! user.username) var message = 'Missing username'
        else if (! user.password) var message = 'Missing password'
        if (message) return new Error(message)
        const newUser = {
            ..._getNewUser(),
            fullName: user.fullName,
            username: user.username,
            password: user.password,
        }
        const userCollection = await dbService.getCollection(USER_COLLECTION)
        await userCollection.insertOne(newUser)
        return newUser
    } catch (err) {
        loggerService.error('Cannot add user:', err)
        throw err
    }
}

async function update(user) {
    try {
        const userCollection = await dbService.getCollection(USER_COLLECTION)
        if (! await getById(user._id)) return new Error()
        const updateUser = {
            fullName: user.fullName,
            username: user.username,
            balance: user.balance,
            cartTotal: user.cartTotal,
            cartItems: user.cartItems,
            boughtItems: user.boughtItems,
        }
        await userCollection.updateOne({ _id: user._id }, { $set: updateUser })
        return await getById(user._id)
    } catch (err) {
        loggerService.error(`Cannot update user '${user.username}':`, err)
        throw err
    }
}

async function getById(userId) {
    return _get('id', userId)
}

async function getByUsername(username) {
    return _get('username', username)
}

async function _get(byKey, valueToCompare) {
    try {
        const userCollection = await dbService.getCollection(USER_COLLECTION)
        if (byKey === 'id') var userQuery = { _id: ObjectId(valueToCompare) }
        else if (byKey === 'username') var userQuery = { username: valueToCompare }
        else return new Error(`Invalid search key='${byKey}'`)
        const user = await userCollection.findOne(userQuery)
        if (! user) return new Error(`No such user`)
        delete user.password
        return user
    } catch (err) {
        loggerService.error(`Cannot get user by ${byKey}='${valueToCompare}':`, err)
        throw err
    }
}

function _getNewUser() {
    return {
        fullName: '',
        username: '',
        password: '',
        balance: 200,
        cartTotal: 0,
        cartItems: [],
        boughtItems: [],
    }
}