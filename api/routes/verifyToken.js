const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token

    if (authHeader) {
        const token = authHeader.split(' ')[1]

        jwt.verify(
            token,
            process.env.JWT_SECRET,
            (err, payloadJWT) => {
                if (err) res.status(403).json('Token is not valid!')
                else {
                    req.payloadJWT = payloadJWT
                    next()
                }
            }
        )
    } else return res.status(401).json('You are not authenticated!')
}

const verifyTokenAndAuthorisation = (req, res, next) => {
    verifyToken(
        req,
        res,
        () => {
            if (req.payloadJWT.id === req.params.id || req.payloadJWT.isAdmin) next()
            else res.status(403).json('You are not allowed to do that.')
        }
    )
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(
        req,
        res,
        () => {
            if (req.payloadJWT.isAdmin) next()
            else res.status(403).json('You are not allowed to do that.')
        }
    )
}

module.exports = {verifyToken, verifyTokenAndAuthorisation, verifyTokenAndAdmin}