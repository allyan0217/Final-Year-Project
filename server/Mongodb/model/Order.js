const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema(
  {
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userInfo",
    },
    OrderItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productInfo",
      },
    ],
    ShippingAddress: {
      type: String,
      required: true,
    },
    PaymentMethod: {
      type: String,
      required: true,
    },
    TotalPrice: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: false,
      default: false,
    },
    PaidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: false,
      default: false,
    },
    DeliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
