import Cryptr from 'cryptr'
import { utilService } from './util.service.js'
import { getDefaultUsers } from '../default/users.js'


const cryptr = new Cryptr(process.env.SECRET || `SuperSecret`)


const DATA_DIR = './data'
const USERS_PATH = DATA_DIR + '/users.json'


export const userService = {
    query,
    save,
    checkLogin,
    getLoginToken,
    validateLoginToken,
}


var prmUsers = _loadUsers()


function _loadUsers() {
    return utilService.loadFromFile(DATA_DIR, USERS_PATH, getDefaultUsers)
}

function _saveUsers() {
    return prmUsers.then(users => utilService.saveToFile(DATA_DIR, USERS_PATH, users))
}

function query() {
    return prmUsers.then(users => {
            if (! users || users.length === 0) {
                prmUsers = _loadUsers()
                return prmUsers
            }
            return users
        })
}

function save(user) {
    return query().then(users => {
            if (user._id) {
                var _user = users.find(_user => _user._id === user._id)
                if (! _user) {
                    return Promise.reject('No such user')
                }
                for (const key of Object.keys(_getNewUser())) {
                    if (user[key]) _user[key] = user[key]
                }
            } else {
                if (users.find(_user => _user.username === user.username)) {
                    return Promise.reject('User already exsists')
                }
                if (! user.fullName) var message = 'Missing full name'
                else if (! user.username) var message = 'Missing username'
                else if (! user.password) var message = 'Missing password'
                if (message) return Promise.reject(message)
                var _user = _getNewUser()
                _user._id = utilService.makeId()
                _user.fullName = user.fullName
                _user.username = user.username
                _user.password = user.password
                _user.isAdmin = false
            }
            users.unshift(_user)
            _user = { ..._user }
            delete _user.password
            return _saveUsers(users).then(() => _user)
        })
}

function _getNewUser() {
    return {
        fullName: user.fullName,
        username: user.username,
        password: user.password,
        balance: 200,
        cartItems: [],
        boughtItems: [],
    }
}

function checkLogin({ username, password}) {
    return query().then(users => {
            let user = users.find(user => user.username === username)
            if (! user) return Promise.reject(`No such username '${username}'`)
            if (user.password !== password) return Promise.reject('Wrong password!')
            user = { ...user }
            delete user.password
            return user
        })
}

function getLoginToken(user) {
    const strUser = JSON.stringify(user)
    const loginToken = cryptr.encrypt(strUser)
    return loginToken
}

function validateLoginToken(loginToken) {
    try {
        const strUser = cryptr.decrypt(loginToken)
        var user = JSON.parse(strUser)
    } catch (err) {
        var user = null
    }
    return user
}