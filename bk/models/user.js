var mongoose = require("mongoose");

var userSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,

    role: {
        type: String,
        required: [true, "please enter  role"],
    },
    phone_number: {
        type: String,
        required: [true, "please enter Email"],
        validate: [
            {
                validator: function(v) {
                    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v);
                },
                message: "please enter a valid Email"
            }
        ]
    },
    isActive: {
        type: Boolean,
        default: true,
    },

});



module.exports = mongoose.model("User", userSchema);