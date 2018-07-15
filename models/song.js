 let mongoose = require('mongoose');

//Song Schema

let songSchema = mongoose.Schema({

name:
{
  type: String,
  required: true
},
artist:
{
  type: String,
  required: true
},
user:
{
  type: Object,
  required: true
}
});

let Song = module.exports = mongoose.model('Song' , songSchema);
