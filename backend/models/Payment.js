const mongoose = require("mongoose");

const PaymentMethodSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ["Visa", "Mastercard", "American Express", "Discover", "PayPal"]
    },
    lastFour: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 4
    },
    expiryDate: {
        type: String,
        validate: {
            validator: function (v) {
                return /^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(v);
            },
            message: props => `${props.value} is not a valid expiry date format (MM/YY)!`
        },
        required: true
    },
    isDefault: {
        type: Boolean,
        default: false
    },
    cardholderName: {
        type: String,
        required: true
    }
});

const TransactionSchema = new mongoose.Schema(
    {
        courseId: {
            type: mongoose.Schema.Types.Mixed, // Use Mixed type to support both ObjectId and numeric IDs
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
            default: 'pending'
        },
        paymentMethod: {
            type: String,
            default: 'credit_card'
        },
        progress: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },
        courseUrl: {
            type: String,
            default: ''
        },
        hours: {
            type: Number,
            default: 0
        },
        img: {
            type: String,
            default: 'default-course.jpg'
        }
    },
    { timestamps: true }
);

const PaymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    paymentMethods: [PaymentMethodSchema],
    transactions: [TransactionSchema],
    totalSpent: {
        type: Number,
        default: 0
    }
});

// Middleware to update totalSpent when a new transaction is added
PaymentSchema.pre("save", function (next) {
    if (this.isModified("transactions")) {
        this.totalSpent = this.transactions.reduce((total, transaction) => {
            if (transaction.status === "completed") {
                return total + transaction.amount;
            }
            return total;
        }, 0);
    }
    next();
});

module.exports = mongoose.model("Payment", PaymentSchema); 