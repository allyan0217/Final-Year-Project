const express = require("express");
require("./db/mongoose");
var cors = require("cors");
const User = require("./model/UserInfo");
const app = express();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const Middleware = require("./Middleware/Middleware");
const Product = require("./model/Product");
const Order = require("./model/Order");
const Review = require("./model/Review");
const multer = require("multer");
// const Stripe=require("stripe")
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.post("/InsertInfo", async (req, res) => {
  console.log("Checking :- ", req.body);
  const data = new User(req.body);
  console.log(data);
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(data.password, salt);

  const newData = new User({
    Username: data.Username,
    password: hash,
  });
  try {
    await newData.save();
    res.status(200).send();
  } catch (error) {
    console.log(error);
  }
});

app.get("/login", async (req, res) => {
  const username = req.query.Username;
  const data = await User.findOne({ Username: username });
  try {
    if (username == data.Username) {
      const token = jwt.sign({ _id: data._id.toString() }, "Thisismyapp");
      res.status(200).send({
        data,
        token: token,
      });
    } else {
      throw new Error("Invalid info");
    }
  } catch (error) {
    res.status(400).send();
    console.log(error);
  }
});

app.post("/updateProfile", async (req, res) => {
  const { name, phone, id } = req.body;
  console.log(name, phone, id);
  try {
    const data = await User.findByIdAndUpdate(id, {
      Username: name,
      Phone: phone,
    });
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send("error");
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/home/salmanaziz/Downloads/MobileApp/assets");
  },
  filename: (re, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
app.post("/addProduct", async (req, res) => {
  const product = new Product({
    Name: req.body.Name,
    Image: req.body.Image,
    Price: req.body.Price,
    rating: req.body.rating,
  });
  console.log(product);
  try {
    await product.save();
    console.log("Uploaded");
    res.status(200);
  } catch (e) {
    res.send(e);
    console.log(e);
    console.log("error");
  }
});
app.get("/productInfo", async (req, res) => {
  try {
    const data = await Product.find().populate({
      path: "reviews",
      populate: {
        path: "User",
      },
    });

    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send("error");
  }
});

app.post("/addReview", async (req, res) => {
  const { user, id, rating, comment } = req.body;
  console.log(user, id, rating, comment);
  try {
    const data = await Product.findById(id);
    const newReview = new Review({
      User: user,
      rating,
      comment,
    });
    await newReview.save();
    data.reviews.push(newReview._id);
    await data.save();
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send("error");
  }
});

app.delete("/deleteProduct", async (req, res) => {
  const id = req.query.id;
  console.log(id);
  try {
    await Product.findByIdAndDelete(id);
    const data1 = await Product.find();
    res.status(200).send(data1);
  } catch (error) {
    res.status(400).send("error");
  }
});

app.post("./pay", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Please enter a name" });
    const paymentIntent = await stripe.paymentIntent.create({
      amount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json("internal server error");
  }
});

app.post("/placeOrder", async (req, res) => {
  console.log("here");
  try {
    const { user, orderItems, shippingAddress, paymentMethod, totalPrice } =
      req.body;
    const order = new Order({
      User: user,
      OrderItems: orderItems,
      ShippingAddress: shippingAddress,
      PaymentMethod: paymentMethod,
      TotalPrice: totalPrice,
    });
    const newOrder = await order.save();
    res.status(200).send(newOrder);
  } catch (error) {
    res.status(400).send("error");
    console.log(error);
  }
});

app.get("/getAllOrders", async (req, res) => {
  try {
    const { id } = req.query;
    const data = await Order.find({ User: id }).populate("OrderItems").exec();
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send("error");
    console.log(error);
  }
});

app.get("/recommendation", async (req, res) => {
  const { id } = req.query;
  try {
    const data = await Order.find({ User: id })
      .populate("OrderItems")
      .sort({ createdAt: -1 })
      .limit(1);
    console.log(data);
    const rec_name = data[0].OrderItems[0].Name.split(" ")[0].toLowerCase();
    const products = await Product.find({
      Name: { $regex: rec_name, $options: "i" },
    }).populate({
      path: "reviews",
      populate: {
        path: "User",
      },
    });

    const random = Math.floor(Math.random() * products.length);
    res.status(200).send(products[random]);
  } catch (error) {
    res.status(400).send("error");
    console.log(error);
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to the server");
});
app.listen(3001, () => {
  console.log("Welcome to port 3001");
});
