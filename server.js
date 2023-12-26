import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'


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
    if (! loggedInUser) return res.status(401).send('Cannot add toy: Not logged in')
    const newToy = {
        name: req.body.name,
        description: req.body.description,
        price: +req.body.price,
    }
    toyService.save(newToy, loggedInUser)
        .then(toy => {
            res.send(toy)
        })
        .catch(err => {
            res.status(400).send(`Cannot create toy: ${err}`)
        })
})

// Toy read
app.get(BASE_TOY_API_URL + '/:toyId', (req, res) => {
    const toyId = req.params.toyId
    toyService.get(toyId)
        .then(toy => {
            res.send(toy)
        })
        .catch(err => {
            req.status(400).send(`Cannot get toy with id='${toyId}': ${err}`)
        })
})

// Toy update
app.put(BASE_TOY_API_URL, (req, res) => {
    const loggedInUser = userService.validateLoginToken(req.cookies.loginToken)
    if (! loggedInUser) return res.status(401).send('Cannot update toy: Not logged in')
    const updatedToy = {
        _id: req.body._id,
        name: req.body.name,
        description: req.body.description,
        price: +req.body.price,
    }
    toyService.save(updatedToy, loggedInUser)
        .then(toy => {
            res.send(toy)
        })
        .catch(err => {
            res.status(400).send(`Cannot update toy with id='${req.body._id}': ${err}`)
        })
})

// Toy delete
app.delete(BASE_TOY_API_URL + '/:toyId', (req, res) => {
    const toyId = req.params.toyId
    const loggedInUser = userService.validateLoginToken(req.cookies.loginToken)
    if (! loggedInUser) return res.status(401).send('Cannot remove toy: Not logged in')
    toyService.remove(toyId, loggedInUser)
        .then(toy => {
            res.send(toy)
        })
        .catch(err => {
            res.status(400).send(`Cannot remove toy: ${err}`)
        })
})

// Toy list
app.get(BASE_TOY_API_URL, (req, res) => {
    toyService.query()
        .then(toys => {
            res.send(toys)
        })
        .catch(err => {
            res.status(400).send(`Cannot get toys: ${err}`)
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
            res.send(user)
        })
        .catch(err => {
            res.status(400).send(`Cannot signup: ${err}`)
        })
})

// User login
app.post(BASE_AUTH_API_URL + '/login', (req, res) => {
    const formUser = req.body
    userService.save(formUser)
        .then(user => {
            const loginToken = userService.getLoginToken(user)
            res.cookie('loginToken', loginToken)
            res.send(user)
        })
        .catch(err => {
            res.status(400).send(`Cannot login: ${err}`)
        })
})

// User logout
app.post(BASE_AUTH_API_URL + '/logout', (req, res) => {
    const loggedInUser = userService.validateLoginToken(req.cookies.loginToken)
    if(! loggedInUser) return res.status(401).send('Cannot logout: Not logged in')
    res.clearCookie('loginToken')
    res.send('Logged out')
})

// User list
app.get(BASE_USER_API_URL, (req, res) => {
    userService.query()
        .then(users => {
            res.send(users)
        })
        .catch(err => {
            res.status(400).send(`Cannot get users: ${err}`)
        })
})
// ----------


const PORT = 3030

app.listen(PORT, () => console.log(`Server ready at port ${PORT}`))