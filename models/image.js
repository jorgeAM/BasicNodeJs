const mongoose = require('mongoose')
mongoose.Promise = global.Promise
//creamos el schema de user
const ImageSchema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	creator: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	}
})

//ahora debemos compilar nuestro Schema en Model
var Image = mongoose.model('Image', ImageSchema)

//exportamos modelo para usarlo en otro archivo js
module.exports.Image = Image;