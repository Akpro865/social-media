const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	firstname: {
		type: String,
		required: true,
		trim: true,
		maxlength: 25
	},
	lastname: {
		type: String,
		required: true,
		trim: true,
		maxlength: 25
	},
	username: {
		type: String,
		required: true,
		trim: true,
		maxlength: 25
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	profile: {
		type: String,
		default: ''
	},
	role: { type: String, default: 'user' },
	gender: { type: String, default: 'male' },
	phone: { type: String, default: '' },
	address: { type: String, default: '' },
	story: { type: String, default: '' },
	website: { type: String, default: '' },
	followers: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
	following: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
},
{
	timestamps: true
})

module.exports = mongoose.model('user', userSchema)