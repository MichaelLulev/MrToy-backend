import { authService } from './auth.service'
import { loggerService } from '../../services/logger.service'


export async function login(req, res) {
    const { username, password } = req.body
    try {
        const user = await authService.login(username, password)
        const loginToken = authService.getLoginToken(user)
        loggerService.info('User login: ', user)
        res.cookie('loginToken', loginToken)
        res.json(user)
    } catch (err) {
        loggerService.error(`Failed to login ` + err)
        res.status(401).send({ err: 'Failed to login' })
    }
}

export async function signup(req, res) {
    try {
        const { fullName, username, password } = req.body
        const account = await authService.signup(fullName, username, password)
        loggerService.debug('auth.route - new account create: ' + JSON.stringify(account))
        const user = await authService.login(username, password)
        const loginToken = authService.getLoginToken(user)
        res.cookie('loginToken', loginToken)
        res.json(user)
    } catch (err) {
        loggerService.error('Failed to signup ' + err)
        res.status(500).send({ err: 'Failed to signup' })
    }
}

export async function logout(req, res) {
    try {
        res.clearCookie('loginToken')
        res.send({ msg: 'Logged out successfully' })
    } catch (err) {
        res.status(500).send({ err: 'Failed to logout' })
    }
}