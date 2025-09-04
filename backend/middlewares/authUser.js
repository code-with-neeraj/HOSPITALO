import jwt from 'jsonwebtoken'

// user authentication middleware
const authUser = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.status(401).json({ success: false, message: 'Not Authorized. Login again' })
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        if (!req.body) req.body = {};
        req.body.userId = token_decode.id
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({ success: false, message: 'Invalid or expired token' })
    }
}
export default authUser;