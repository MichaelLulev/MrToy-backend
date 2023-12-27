import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { userService } from './services/user.service.js'
import { toyService } from './services/toy.service.js'
import { loggerService } from './services/logger.service.js'


const BASE_API_URL = '/api/'
const BASE_API_URL_TOY = BASE_API_URL + 'toy'
const BASE_API_URL_AUTH = BASE_API_URL + 'auth'
const BASE_API_URL_USER = BASE_API_URL + 'user'


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
app.post(BASE_API_URL_TOY, (req, res) => {
    const loggedInUser = userService.validateLoginToken(req.cookies.loginToken)
    if (! loggedInUser) {
        const message = 'Cannot add toy: Not logged in'
        loggerService.error(message)
        return res.status(401).send(message)
    }
    const newToy = {
        name: req.body.name,
        description: req.body.description,
        price: +req.body.price,
    }
    toyService.save(newToy, loggedInUser)
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

// Toy read
app.get(BASE_API_URL_TOY + '/:toyId', (req, res) => {
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
app.put(BASE_API_URL_TOY, (req, res) => {
    const loggedInUser = userService.validateLoginToken(req.cookies.loginToken)
    if (! loggedInUser) {
        const message = 'Cannot update toy: Not logged in'
        loggerService.error(message)
        return res.status(401).send(message)
    }
    const updatedToy = {
        _id: req.body._id,
        name: req.body.name,
        description: req.body.description,
        price: +req.body.price,
    }
    toyService.save(updatedToy, loggedInUser)
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
app.delete(BASE_API_URL_TOY + '/:toyId', (req, res) => {
    const toyId = req.params.toyId
    const loggedInUser = userService.validateLoginToken(req.cookies.loginToken)
    if (! loggedInUser) {
        const message = 'Cannot remove toy: Not logged in'
        loggerService.error(message)
        return res.status(401).send(message)
    }
    toyService.remove(toyId, loggedInUser)
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
app.get(BASE_API_URL_TOY, (req, res) => {
    const filterBy = {
        text: req.query.text,
        stock: req.query.stock,
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
app.post(BASE_API_URL_AUTH + '/signup', (req, res) => {
    const formUser = req.body
    userService.save(formUser)
        .then(user => {
            const loginToken = userService.getLoginToken(user)
            res.cookie('loginToken', loginToken)
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
app.post(BASE_API_URL_AUTH + '/login', (req, res) => {
    const loggedInUser = userService.validateLoginToken(req.cookies.loginToken)
    if(loggedInUser) {
        const message = 'Cannot login: Already logged in'
        loggerService.error(message)
        return res.status(401).send(message)
    }
    const formUser = req.body
    userService.checkLogin(formUser)
        .then(user => {
            const loginToken = userService.getLoginToken(user)
            res.cookie('loginToken', loginToken)
            loggerService.info(`Login user '${user.username}'`)
            res.send(user)
        })
        .catch(err => {
            const message = `Cannot login: ${err}`
            loggerService.error(message)
            res.status(401).send(message)
        })
})

// User logout
app.post(BASE_API_URL_AUTH + '/logout', (req, res) => {
    const loggedInUser = userService.validateLoginToken(req.cookies.loginToken)
    if(! loggedInUser) {
        const message = 'Cannot logout: Not logged in'
        loggerService.error(message)
        return res.status(401).send(message)
    }
    res.clearCookie('loginToken')
    delete loggedInUser.password
    loggerService.info(`Logout user '${loggedInUser.username}'`)
    res.send(loggedInUser)
})

// User list
app.get(BASE_API_URL_USER, (req, res) => {
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