const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    f_name: {
        type: String,
        required: [true, 'Please provide First name']
    },
    s_name: {
        type: String,
        required: [true, 'Please provide Sure name']
    },
    email: {
        type: String,
        required: [true, 'Please provide Email']
    },
    phone: {
        type: String,
        required: [true, 'Please provide Phone number']
    },
    password: {
        type: String,
        required: [true, 'Please provide password']
    },
});

UserSchema.pre('save', function (next) {
    const user = this;

    bcrypt.hash(user.password, 10).then(hash => {
        user.password = hash;
        next();
    }).catch(error => {
        console.error(error);
        next(error);
    });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
