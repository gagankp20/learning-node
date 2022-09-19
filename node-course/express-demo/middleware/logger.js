function log(req, res, next) {
    console.log('logging middleware function')
    next()
}

module.exports = log;