const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/tms" , { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("Mongodb connected!");
})
.catch(()=>{
    console.log("Failed to connected!");
})

const LogInSchema = new mongoose.Schema({
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    }
})

const guideSchema = new mongoose.Schema({
    nid:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    name:{
        type: String,
        require: true
    },
    location:{
        type: String,
        require: true
    },
    experience:{
        type: String,
        require: true
    },
    phone:{
        type: String,
        require: true
    },
    avail:{
        type: String,
        require: true
    },
    image: {
        contentType: String,
        image: Buffer
      }

})

const jhoomSchema = new mongoose.Schema({
    nid:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    name:{
        type: String,
        require: true
    },
    location:{
        type: String,
        require: true
    },
    capacity:{
        type: String,
        require: true
    },
    room:{
        type: String,
        require: true
    },
    phone:{
        type: String,
        require: true
    },
    image: {
        contentType: String,
        image: Buffer
      }

})

const restaurantSchema = new mongoose.Schema({
    nid:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    ownername:{
        type: String,
        require: true
    },
    rname:{
        type: String,
        require: true
    },
    location:{
        type: String,
        require: true
    },
    phone:{
        type: String,
        require: true
    },
    image: {
        contentType: String,
        image: Buffer
      }

})

const menuSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    price:{
        type: String,
        require: true
    },
    rname:{
        type: String,
        require: true
    },
    image: {
        contentType: String,
        image: Buffer
      }

})

const tourist = new mongoose.model("tourist" , LogInSchema);
const guide = new mongoose.model("guide" , guideSchema);
const jhoom = new mongoose.model("jhoom" , jhoomSchema);
const menu = new mongoose.model("menu" , menuSchema);
const restaurant = new mongoose.model("restaurant" , restaurantSchema);

module.exports = {tourist , guide , jhoom , menu, restaurant};
