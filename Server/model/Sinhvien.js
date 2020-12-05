var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var SinhVienSchema = new mongoose.Schema({
  username: {type: String, lowercase: true, unique: true, required: [true, "noy blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid']},
  email: {type: String, lowercase: true, unique: true, required: [true, "not blank"], match: [/\S+@\S+\.\S+/, 'is invalid']},
  age : {type: Number, required:[true,"not blank"]},
  name: {type: String ,required:[true,"not blank"]},
  sex: {type: Boolean, required:[true,"not blank"]}
}, {timestamps: true});

SinhVienSchema.plugin(uniqueValidator, {message: 'is already taken.'});

SinhVienSchema.methods.toProfileJSON = function(user){
  return {
    id : this.id,
    username: this.username,
    email : this.email,
    age : this.age,
    name: this.name,
    sex: this.sex,
  };
};


mongoose.model('SinhVien', SinhVienSchema);
