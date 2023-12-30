import { loggerService } from '../services/logger.service.js'


export async function log(req, res, next) {
    loggerService.info('Request was made', req.route.path)
    next()
}