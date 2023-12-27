import Cryptr from 'cryptr'
import { utilService } from './util.service.js'
import { defaultUsers } from '../default/users.js'


const cryptr = new Cryptr(process.env.SECRET || `${Date.now()}`)


const DATA_DIR = './data'
const USERS_PATH = DATA_DIR + '/users.json'


export const userService = {
    query,
    save,
    getNewUser,
    checkLogin,
    getLoginToken,
    validateLoginToken,
}


var prmUsers = _loadUsers()


function _loadUsers() {
    return utilService.loadFromFile(DATA_DIR, USERS_PATH, () => defaultUsers)
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
        .catch(err => console.error(err) || Promise.reject(err))
}

function save(user) {
    return query().then(users => {
            if (users.find(_user => _user.username === user.username)) {
                return Promise.reject('User already exsists')
            }
            let newUser = getNewUser()
            for (let key in newUser) {
                if (user[key]) newUser[key] = user[key]
                else return Promise.reject('Missing ' + key)
            }
            newUser._id = utilService.makeId()
            newUser.isAdmin = false
            users.unshift(newUser)
            user = { ...newUser }
            delete user.password
            return _saveUsers(users).then(() => user)
        })
        .catch(err => console.error(err) || Promise.reject(err))
}

function getNewUser() {
    return {
        fullName: '',
        username: '',
        password: '',
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