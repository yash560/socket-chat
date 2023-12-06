import mongoose from "mongoose";

const TeamSchema=mongoose.Schema({
    id: Number,
    name: {
        type: String,
        required,
    },
    avatar: {
        type: String,
    },

})

const Team=mongoose.model("Team", TeamSchema);
module.exports=Team;
