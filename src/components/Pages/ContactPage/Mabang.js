import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Mabang = () => {
    const [orderData, setOrderData] = useState({
        productName: '',
        quantity: 1,
        customerName: '',
        address: ''
    });

    const handleChange = (e) => {
        setOrderData({ ...orderData, [e.target.name]: e.target.value });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log({
    //         product_name: orderData.productName,
    //         quantity: orderData.quantity,
    //         customer_name: orderData.customerName,
    //         address: orderData.address
    //     });
    //     try {
    //         const response = await axios.post(
    //             // `${process.env.REACT_APP_MABANG_BASE_URL}/orders/add`,
    //             `https://gwapi.mabangerp.com/api/v2/orders/add`,
    //             {
    //                 product_name: orderData.productName,
    //                 quantity: orderData.quantity,
    //                 customer_name: orderData.customerName,
    //                 address: orderData.address
    //             },
    //             {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     // 'Authorization': `Bearer ${process.env.REACT_APP_MABANG_API_KEY}`
    //                     'Authorization': `Bearer 201366`
    //                     // 'Authorization': `Bearer 5d03f1bb8250d0be59fec54ce1d9be9d`
    //                 }
    //             }
    //         );

    //         if (response.status === 200) {
    //             alert('Order added successfully!');
    //         }
    //     } catch (error) {
    //         console.error('Error adding order:', error);
    //         alert('Failed to add order. Please try again.');
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const response = await axios.post('http://localhost:2000/tht/api/add-order', {
            const response = await axios.post('https://grozziieget.zjweiting.com:8033/tht/api/add-order', {
                product_name: orderData.productName,
                quantity: orderData.quantity,
                customer_name: orderData.customerName,
                address: orderData.address
            });

            if (response.status === 200) {
                alert('Order added successfully!');
            }
        } catch (error) {
            console.error('Error adding order:', error);
            alert('Failed to add order. Please try again.');
        }
    };
    const [orders, setOrders] = useState([])

    const fetchOrders = async () => {
        try {
            const response = await axios.get(
                `https://gwapi.mabangerp.com/api/v2/orders/list`, // Replace with the actual endpoint
                {
                    headers: {
                        'Authorization': `Bearer 201366` // Replace with a secure token
                    }
                }
            );
            setOrders(response.data.orders); // Adjust based on the structure of the API response
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    // Fetch orders on component mount
    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div>
            <form className="my-96" onSubmit={handleSubmit}>
                <label>
                    Product Name:
                    <input
                        type="text"
                        name="productName"
                        value={orderData.productName}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Quantity:
                    <input
                        type="number"
                        name="quantity"
                        value={orderData.quantity}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Customer Name:
                    <input
                        type="text"
                        name="customerName"
                        value={orderData.customerName}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Address:
                    <input
                        type="text"
                        name="address"
                        value={orderData.address}
                        onChange={handleChange}
                    />
                </label>
                <button className="text-green-300 btn-circle mx-5 my-2" type="submit">Add Order</button>
            </form>
            <h2>Order List</h2>
            <ul>
                {orders.map((order, index) => (
                    <li key={index}>
                        <p>Product: {order.product_name}</p>
                        <p>Quantity: {order.quantity}</p>
                        <p>Customer: {order.customer_name}</p>
                        <p>Address: {order.address}</p>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Mabang;
