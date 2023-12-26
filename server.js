import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { userService } from './services/user.service.js'
import { toyService } from './services/toy.service.js'
import { loggerService } from './services/logger.service.js'


const BASE_API_URL = '/api/'
const BASE_TOY_API_URL = BASE_API_URL + 'toy'
const BASE_AUTH_API_URL = BASE_API_URL + 'auth'
const BASE_USER_API_URL = BASE_API_URL + 'user'


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
app.post(BASE_TOY_API_URL, (req, res) => {
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
app.get(BASE_TOY_API_URL + '/:toyId', (req, res) => {
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
app.put(BASE_TOY_API_URL, (req, res) => {
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
app.delete(BASE_TOY_API_URL + '/:toyId', (req, res) => {
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
app.get(BASE_TOY_API_URL, (req, res) => {
    toyService.query()
        .then(toys => {
            loggerService.info(`Get toys`)
            res.send(toys)
        })
        .catch(err => {
            const message = `Cannot get toys: ${err}`
            loggerService.error(message)
            res.status(400).send(message)
        })
})
// ----------

// User
// ----------

// User signup
app.post(BASE_AUTH_API_URL + '/signup', (req, res) => {
    const formUser = req.body
    userService.save(formUser)
        .then(user => {
            const loginToken = userService.getLoginToken(user)
            res.cookie('loginToken', loginToken)
            loggerService.info(`Signup username='${user.username}'`)
            res.send(user)
        })
        .catch(err => {
            const message = `Cannot signup: ${err}`
            loggerService.error(message)
            res.status(400).send(message)
        })
})

// User login
app.post(BASE_AUTH_API_URL + '/login', (req, res) => {
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
            loggerService.info(`Login username='${user.username}'`)
            res.send(user)
        })
        .catch(err => {
            const message = `Cannot login: ${err}`
            loggerService.error(message)
            res.status(401).send(message)
        })
})

// User logout
app.post(BASE_AUTH_API_URL + '/logout', (req, res) => {
    const loggedInUser = userService.validateLoginToken(req.cookies.loginToken)
    if(! loggedInUser) {
        const message = 'Cannot logout: Not logged in'
        loggerService.error(message)
        return res.status(401).send(message)
    }
    res.clearCookie('loginToken')
    delete loggedInUser.password
    loggerService.info(`Logout username='${loggedInUser.username}'`)
    res.send(loggedInUser)
})

// User list
app.get(BASE_USER_API_URL, (req, res) => {
    userService.query()
        .then(users => {
            loggerService.info('Get users')
            res.send(users)
        })
        .catch(err => {
            const message = `Cannot get users: ${err}`
            loggerService.error(message)
            res.status(400).send(message)
        })
})
// ----------


const PORT = 3030

app.listen(PORT, () => loggerService.info(`Server ready at port ${PORT}`))