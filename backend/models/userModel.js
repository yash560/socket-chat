const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    id: Number,
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    avatar: {
        type: String,
    },
    online: {
        type: Boolean,
        default: false,
    }
})

const User=mongoose.model("User", userSchema);
module.exports=User;
