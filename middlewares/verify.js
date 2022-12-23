const jwt = require('jsonwebtoken')
const User = require('../models/user')

const verify = async(req, res, next)=>{
	let token;
	try {
	  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

		token = req.headers.authorization.split(' ')[1]

		const decoded = jwt.verify(token, process.env.SECRET_KEY)

		const user = await User.findById(decoded.id).select('-password')

		req.user = user

		next()
	  }
	} catch(err) {
		console.log(err)
		res.status(401).json('not authenticated')
	}
}

module.exports = { verify }