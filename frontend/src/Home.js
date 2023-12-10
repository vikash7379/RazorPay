    import React from 'react'
    import axios from 'axios'

    const Home = () => {

        const handleBuy = async() =>{
            const amount = 230.99;

            const {data : {key}} = await axios.get('http://localhost:8080/api/razor-key')
            const {data: {order}} = await axios.post('http://localhost:8080/api/order',{
                amount
            })

            const options = {
                key,
                amount : order.amount,
                currency : order.currency,
                name: "Women leather bag",
                description: "Test Transaction of Razorpay",
                image: "https://1000logos.net/wp-content/uploads/2021/02/Flipkart-Logo-2007-768x432.png",
                order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                callback_url: "http://localhost:8080/api/paymentVerification",
                prefill: {
                    "name": "Vikash chaurasia",  // logged in user details
                    "email": "https://www.linkedin.com/in/vikash-chaurasia/",
                    "contact": "9000090000"
                },
                notes: {
                    "address": "Razorpay Corporate Office"
                },
                theme: {
                    "color": "#121212"
                }
            };
            const razor = new window.Razorpay(options);
            razor.open();
        }


    return (
        <div className={"divCenter"}>
            <div>
            <div className="product-card">
            <div className="badge">Hot</div>
            <div className="product-tumb">
                <img src="https://i.imgur.com/xdbHo4E.png" alt="product"/>
            </div>
            <div className="product-details">
                <span className="product-catagory">Women,bag</span>
                <h4>Women leather bag</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus nostrum!</p>
                <div className="product-bottom-details">
                    <div className="product-price"><small>₹96.00</small>₹230.99</div>
                </div>
                <div><button className='btn' onClick={handleBuy}>Buy</button></div>
            </div>
        </div>
            </div>
        </div>
    )
    }

    export default Home;