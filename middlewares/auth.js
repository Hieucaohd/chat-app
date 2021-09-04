const jwt = require("jsonwebtoken");
const axios = require("axios");

const getInforOfUser = async (token) => {
    return await axios.request({
        url: 'http://localhost:8000/auth/getInforByToken/',
        headers: {
            'Authorization': `${token}`
        },
    })
}

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({error: "A token is required for authentication"});
    }

    try {
        const infor = await getInforOfUser(token);
        req.user = infor.data;
    } catch (err) {
        return res.status(401).json({error: "Invalid token or server error"});
    }
    
    return next();
}

module.exports = verifyToken;