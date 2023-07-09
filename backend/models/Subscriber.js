import mongoose from "mongoose";
const subscriberSchema = mongoose.Schema({
    userTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userFrom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})


const Subscriber = mongoose.model('Subscriber', subscriberSchema);

export default Subscriber