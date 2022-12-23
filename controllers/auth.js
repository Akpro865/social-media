const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const asyncHandler = require('express-async-handler')

// user register
const register = asyncHandler(async(req, res)=>{
	const { firstname, lastname, username, email, password, profile, role, gender,
	        phone, address, story, website, following, followers } = req.body
	console.log(req.body)
	if(!firstname, !lastname, !username, !email, !password, !profile, !role, !gender,
	   !phone, !address, !story, !website){

	   res.status(500).json('please fill all fields')
	}

	const existUser = await User.findOne({username})
	if(existUser) return res.status(400).json('user already exist')

	const existEmail = await User.findOne({email})
	if(existEmail) return res.status(400).json('email already exist')		

	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(password, salt)

	const user = await User.create({ firstname, lastname, username, email,
	        profile, password: hashedPassword, role, gender,
	        phone, address, story, website, following, followers })


	const accessToken = createAccessToken({id: user._id})
	const refreshToken = createRefreshToken({id: user._id})

	res.cookie('refresh_token', refreshToken, {
		httpOnly: true,
		path: '/api/auth/refreshtoken',
		maxAge: 30*24*60*60*1000
	})

	if(user && (await bcrypt.compare(password, user.password))){		
		const { password, ...others } = user._doc
		res.status(200).json({ ...others, accessToken, refreshToken })
	} 
})

// login route
const login = asyncHandler(async(req, res)=>{
	const { email, password } = req.body

	const user = await User.findOne({email})

	if(!email || !password) return res.status(400).json('Please fill all fields')

	if(!user) return res.status(400).json('no user found')
	
	const accessToken = createAccessToken({id: user._id})
	const refreshToken = createRefreshToken({id: user._id})

	res.cookie('refresh_token', refreshToken, {
		httpOnly: true,
		path: '/api/auth/refreshtoken',
		maxAge: 30*24*60*60*1000
	})

	if(user && (await bcrypt.compare(password, user.password))){		
		const { password, ...others } = user._doc
		console.log(refreshToken)
		res.status(200).json({ ...others, accessToken, refreshToken })
	} else {
    	res.status(400).json('Invalid credentials')
  	}
})

const logout = asyncHandler(async(req, res)=>{
	try{
		res.clearCookie('refresh_token', { path: '/api/auth/refreshtoken' })
		res.status(200).json('logout success!')
	}catch(err){
		res.status(500).json(err.message)
	}
})

const generateAccessToken = async(req, res)=>{
	try{
		const { rf_token } = req.body

		if(!rf_token) return res.status(400).json('Please login now')
		await jwt.verify(rf_token, process.env.SECRET_KEY, async(err, result)=>{			
			if(err) return res.status(400).json('Please login to continue!')
			
			const user = await User.findById(result.id).select('-password')
			 .populate('followers following', '-password')

			if(!user) return res.status(400).json("this doesn't exist")

			const accessToken = createAccessToken({id: user._id})
		    const { password, ...others } = user._doc

			res.json({ ...others, accessToken })
		})
	}catch(err){
		console.log(err)
		res.status(500).json(err.message)
	}
}

const createAccessToken = (payload)=>{
	return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "2d"})
}

const createRefreshToken = (payload)=>{
	return jwt.sign(payload, process.env.REFRESH_SECRET_KEY, { expiresIn: '5d'})
}

module.exports = { register, login, logout, generateAccessToken }