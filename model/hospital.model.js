const mongoose=require('mongoose');

const hospitalSchema= mongoose.Schema({
    name:String,
    image:String,
    experience:Number,
    location:String,
    specialization: {
        type: String,
        enum: ['Cardiologist', 'Dermatologist', 'Pediatrician', 'Psychiatrist'],
        required: true
      },
      date: {
        type: Date,
        default: Date.now,
        required: true
      },
    slots:Number,
    fee:Number,
    booknow:{
        type:Boolean,
        default:false
    }



})

const hospitalModel= mongoose.model("hospital",hospitalSchema)

module.exports={hospitalModel}