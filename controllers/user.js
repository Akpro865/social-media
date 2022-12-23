const User = require('../models/user')

const searchUsers = async(req, res)=>{
	try {
	  const users = await User.find({username: { $regex: req.query.username }})
						 .limit(10).select("username firstname lastname profile")

	 res.status(200).json(users)
	} catch (err){
		console.log(err)
	}
}

const getSearchUser = async(req, res)=>{
	try {
		const user = await User.findById(req.params.id).select('-password')

		res.status(200).json(user)
	} catch(err) {
		console.log(err)
	}
}

const updateUser = async(req, res)=>{
	try{
		const { firstname, lastname, username, email, profile, role, gender, phone,address, story, website } = req.body
		if(!username) return res.status(400).json('username required')
			
		await User.findOneAndUpdate({_id: req.user._id}, {
			firstname, lastname, username, email, profile, role, gender, phone,address, story, website
		})

		res.status(200).json('updated successfully!')
	} catch(err) {
		console.log(err)
	}
}

module.exports = { searchUsers, getSearchUser, updateUser }