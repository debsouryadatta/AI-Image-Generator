import mongoose from 'mongoose';

const User = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'Please provide valid email',
        ],
        unique: true,
    },
    about: {
        type: String
    },
    profilePicUrl: {
        type: String
    },
    followers: {
        type: String
    },
    following: {
        type: String
    }
})

const UserSchema = mongoose.model('User', User);

export default UserSchema