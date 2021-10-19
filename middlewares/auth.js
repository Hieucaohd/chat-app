const jwt = require("jsonwebtoken");
const axios = require("axios");

const DEBUG = require("../index");

const getInforOfUser = async (token) => {
    let findTutorServer = "http://localhost:8000";

	if ( DEBUG ) {
		findTutorServer = "https://findtutorapp.website/api";
	}

    return await axios.request({
        url: `${findTutorServer}/auth/getInforByToken/`,
        headers: {
            'Authorization': `${token}`
        },
    })
}

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;
	req.user = {};
	req.user.isAuthenticated = false;
	if (token) {
		try {
			const infor = await getInforOfUser(token);
			req.user = infor.data;
			req.user.isAuthenticated = true;
		} catch (err) {
			return res.status(401).json({error: "Invalid token or server error"});
		}
	}
    
    return next();
}

module.exports = verifyToken;
