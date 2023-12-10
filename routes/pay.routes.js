const express = require('express')
const Razorpay = require("razorpay");
const crypto = require('crypto')


const router = express.Router();


// Razorpay instance
const  instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});

router.get('/razor-key',async(req,res)=>{
    try {
        res.status(200).json({key : process.env.RAZORPAY_KEY_ID})
    } catch (error) {
        console.log(error)
    }
})

router.post("/order",async(req,res)=>{
    const options = {
        amount : Number(req.body.amount*100),
        currency : "INR",
    }
    try {
        const order = await instance.orders.create(options);
        res.status(200).json({status : true,order});

    } catch (error) {
        console.log(error)
    }
})

router.post('/paymentVerification',async(req,res)=>{
    console.log('Request Body:', req.body);

    try {
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;
        console.log("Order ID:", razorpay_order_id);
        console.log("Payment ID:", razorpay_payment_id);
        console.log("Key Secret:", process.env.RAZORPAY_SECRET_KEY);
        console.log("first",razorpay_payment_id)

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        console.log("Sign:", sign);
        const expectedSign = crypto
            .createHmac("sha256",process.env.RAZORPAY_SECRET_KEY)
            .update(sign.toString())
            .digest("hex");
        const varified = razorpay_signature === expectedSign;
        console.log("vaar",varified);

        if(varified){
            return res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`)
        }else{
            return res.status(400).json({message :  "Invalid Signature sent"});
        }

    } catch (error) {
        console.log("error in verification",error)
    }
})


module.exports = router;