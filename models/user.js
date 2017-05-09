const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/fotos')

//creamos el schema de user
const UserSchema = mongoose.Schema({
	name: String,
	username: String,
	email: String,
	password: String,
	age: Number,
	date_of_birth: Date

})

/** VIRTUAL PARA VALIDACION **/
UserSchema.virtual('password_confirmation').get(()=>{
	return this.confirmation
}).set((password)=>{
	this.confirmation = password
})

//ahora debemos compilar nuestro Schema en Model
var User = mongoose.model('User', UserSchema)

//exportamos modelo para usarlo en otro archivo js
module.exports.User = User;