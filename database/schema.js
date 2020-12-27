const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true
    },
    confirm_password: {
        type: String,
        required: true

    },
    traveling_history: [
        {
            from: String,
            to: String,
            KMS: String,
            vehicle: String,
            paid_amount: String

        }
    ]
    ,
    Date: {
        type: Date,
        default: Date.now

    }

})
const db = mongoose.model("customer_data", schema);
module.exports = db;
