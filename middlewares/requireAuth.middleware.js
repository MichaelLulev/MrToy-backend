import { loggerService } from '../services/logger.service.js'
import { authService } from '../api/auth/auth.service.js'


export async function requireAuth(req, res, next) {
    if (! req?.cookies?.loginToken) {
        return res.status(401).send('Not Authenticated')
    }
    const loggedInUser = authService.validateLoginToken(req.cookies.loginToken)
    if(! loggedInUser) return res.status(401).send('Not authenticatd')
    req.loggedInUser = loggedInUser
    next()
}

export async function requireAdmin(req, res, next) {
    if (! req?.cookies?.loginToken) {
        return res.status(401).send('Not Authenticated')
    }
    const loggedInUser = authService.validateLoginToken(req.cookies.loginToken)
    if (! loggedInUser.isAdmin) {
        loggerService.warn(loggedInUser.fullName + ' attempted to perform admin action')
        res.status(403).end('Not Authorized')
        return
    }
    next()
}