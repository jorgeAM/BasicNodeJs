const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/fotos')

//creamos el schema de user
const UserSchema = mongoose.Schema({
	name: String,
	username: {type: String, required: true, maxLength: 50, minLength: 8},
	email: {type: String, required: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]},
	password: String,
	age: {type: Number, min: 5, max: 100},
	date_of_birth: Date,
	sex: {type: String, enum:['Masculino', 'Femenino']}

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