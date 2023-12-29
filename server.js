import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { userService } from './services/user.service.js'
import { toyService } from './services/toy.service.js'
import { loggerService } from './services/logger.service.js'


const BASE_URL_API = '/api/'
const BASE_URL_TOY_API = BASE_URL_API + 'toy'
const BASE_URL_AUTH_API = BASE_URL_API + 'auth'
const BASE_URL_USER_API = BASE_URL_API + 'user'


const app = express()

const corsOptions = {
    origin: [
        'http://127.0.0.1:8080',
        'http://localhost:8080',
        'http://127.0.0.1:5173',
        'http://localhost:5173',
    ],
    credentials: true,
}

app.use(cors(corsOptions))
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())


// Toy
// ----------

// Toy create
app.post(BASE_URL_TOY_API, (req, res) => {
    const loggedInUser = userService.validateLoginToken(req.cookies.loginToken)
    if (! loggedInUser) var message = 'Cannot add toy: Not logged in'
    else if (! loggedInUser.isAdmin) var message = 'Cannot add toy: Not admin'
    if (message) return loggerService.error(message) || res.status(401).send(message)
    toyService.save(req.body)
        .then(toy => {
            loggerService.info(`Create toy with id='${toy._id}'`)
            res.send(toy)
        })
        .catch(err => {
            const message = `Cannot create toy: ${err}`
            loggerService.error(message)
            res.status(400).send(message)
        })
})

app.get(BASE_URL_TOY_API + '/label', (req, res) => {
    toyService.getAllLabels()
        .then(labels => {
            loggerService.info(`Get labels`)
            res.send(labels)
        })
        .catch(err => {
            const message = `Cannot get labels: ${err}`
            loggerService.error(message)
            res.status(400).send(message)
        })
})

// Toy read
app.get(BASE_URL_TOY_API + '/:toyId', (req, res) => {
    const toyId = req.params.toyId
    toyService.get(toyId)
        .then(toy => {
            loggerService.info(`Get toy with id='${toyId}'`)
            res.send(toy)
        })
        .catch(err => {
            const message = `Cannot get toy with id='${toyId}': ${err}`
            loggerService.error(message)
            res.status(400).send(message)
        })
})

// Toy update
app.put(BASE_URL_TOY_API, (req, res) => {
    const loggedInUser = userService.validateLoginToken(req.cookies.loginToken)
    if (! loggedInUser) var message = 'Cannot update toy: Not logged in'
    else if (! loggedInUser.isAdmin) req.body = { _id: req.body._id, stockDiff: req.body.stockDiff }
    else if (! req.body.stockDiff && req.body.stock < 0) 'Cannot update toy: Out of stock'
    if (message) return loggerService.error(message) || res.status(401).send(message)
    toyService.save(req.body)
        .then(toy => {
            loggerService.info(`Update toy with id='${req.body._id}'`)
            res.send(toy)
        })
        .catch(err => {
            const message = `Cannot update toy with id='${req.body._id}': ${err}`
            loggerService.error(message)
            res.status(400).send(message)
        })
})

// Toy delete
app.delete(BASE_URL_TOY_API + '/:toyId', (req, res) => {
    const toyId = req.params.toyId
    const loggedInUser = userService.validateLoginToken(req.cookies.loginToken)
    if (! loggedInUser) var message = 'Cannot remove toy: Not logged in'
    else if (! loggedInUser.isAdmin) var message = 'Cannot remove toy: Not admin'
    if (message) return loggerService.error(message) || res.status(401).send(message)
    toyService.remove(toyId)
        .then(toy => {
            loggerService.info(`Remove toy with id='${toyId}'`)
            res.send(toy)
        })
        .catch(err => {
            const message = `Cannot update toy with id='${toyId}': ${err}`
            loggerService.error(message)
            res.status(400).send(message)
        })
})

// Toy list
app.get(BASE_URL_TOY_API, (req, res) => {
    const filterBy = {
        text: req.query.text,
        stock: req.query.stock,
        labels: JSON.parse(req.query.labels),
    }
    const sortBy = {
        field: req.query.field,
        isAscending: JSON.parse(req.query.isAscending),
    }
    const pageInfo = {
        pageNum: +req.query.pageNum,
        toysPerPage: +req.query.toysPerPage
    }
    toyService.query(filterBy, sortBy, pageInfo)
        .then(toyPage => {
            loggerService.info(`Get toys list`)
            res.send(toyPage)
        })
        .catch(err => {
            const message = `Cannot get toys list: ${err}`
            loggerService.error(message)
            res.status(400).send(message)
        })
})
// ----------

// User
// ----------

// User signup
app.post(BASE_URL_AUTH_API + '/signup', (req, res) => {
    userService.save(req.body)
        .then(user => {
            res.cookie('loginToken', userService.getLoginToken(user))
            loggerService.info(`Signup user '${user.username}'`)
            res.send(user)
        })
        .catch(err => {
            const message = `Cannot signup: ${err}`
            loggerService.error(message)
            res.status(400).send(message)
        })
})

// User login
app.post(BASE_URL_AUTH_API + '/login', (req, res) => {
    const loggedInUser = userService.validateLoginToken(req.cookies.loginToken)
    if (loggedInUser) var message = 'Cannot login: Already logged in'
    if (message) return loggerService.error(message) || res.status(401).send(message)
    userService.checkLogin(req.body)
        .then(user => {
            res.cookie('loginToken', userService.getLoginToken(user))
            loggerService.info(`Login user '${user.username}'`)
            res.send(user)
        })
        .catch(err => {
            const message = `Cannot login: ${err}`
            loggerService.error(message)
            res.status(401).send(message)
        })
})

// User update
app.put(BASE_URL_USER_API + '/update', (req, res) => {
    const loggedInUser = userService.validateLoginToken(req.cookies.loginToken)
    if (! loggedInUser) var message = 'Cannot update user: Not logged in'
    else if (req.body.balance < 0) var message = 'Cannot update user: Insufficient balance'
    if (message) return loggerService.error(message) || res.status(401).send(message)
    userService.save(req.body)
        .then(user => {
            loggerService.info(`Update user '${user.username}'`)
            res.send(user)
        })
        .catch(err => {
            const message = `Cannot update user: ${err}`
            loggerService.error(message)
            res.status(400).send(message)
        })
})

// User logout
app.post(BASE_URL_AUTH_API + '/logout', (req, res) => {
    const loggedInUser = userService.validateLoginToken(req.cookies.loginToken)
    if(! loggedInUser) var message = 'Cannot logout: Not logged in'
    if (message) return loggerService.error(message) || res.status(401).send(message)
    res.clearCookie('loginToken')
    delete loggedInUser.password
    loggerService.info(`Logout user '${loggedInUser.username}'`)
    res.send(loggedInUser)
})

// User list
app.get(BASE_URL_USER_API, (req, res) => {
    const loggedInUser = userService.validateLoginToken(req.cookies.loginToken)
    if (! loggedInUser) var message = 'Cannot list users: Not logged in'
    else if (! loggedInUser.isAdmin) var message = 'Cannot list users: Not admin'
    if (message) return loggerService.error(message) || res.status(401).send(message)
    userService.query()
        .then(users => {
            loggerService.info('Get users list')
            res.send(users)
        })
        .catch(err => {
            const message = `Cannot get users list: ${err}`
            loggerService.error(message)
            res.status(400).send(message)
        })
})
// ----------


const PORT = process.env.PORT || 3030

app.listen(PORT, () => loggerService.info(`Server start at port ${PORT} <-`))