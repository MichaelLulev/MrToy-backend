import Cryptr from 'cryptr'
import bcrypt from 'bcrypt'

import { userService } from '../user/user.service'
import { loggerService } from '../../services/logger.service'

export const authService = {
    signup,
    login,
    getLoginToken,
    validateLoginToken,
}

const cryptr = new Cryptr(process.env.SECRET || 'SuperSecret')

async function signup(fullName, username, password) {
    const hashRounds = 10
    loggerService.debug(`auth.service - signup with username: ${username} / fullname: ${fullName}`)
    if (! username || ! password || ! fullName) throw new Error('Missing details')
    const hash = await bcrypt.hash(password, hashRounds)
    return userService.add({ fullName, username, password: hash })
}

async function login(username, password) {
    loggerService.debug(`auth.service - login with username: ${username}`)
    const user = await userService.getByUsername(username)
    if (! user) throw new Error('Invalid username or password')
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (! passwordMatch) throw new Error('Invalid username or password')
    delete user.password
    return user
}

function getLoginToken(user) {
    const userInfo = {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        isAdmin: user.isAdmin
    }
    return cryptr.encrypt(JSON.stringify(userInfo))
}

function validateLoginToken(loginToken) {
    try {
        const json = cryptr.decrypt(loginToken)
        const loggedInUser = JSON.parse(json)
        return loggedInUser
    } catch (err) {
        console.log('Invalid login token')
    }
    return null
}