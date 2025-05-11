import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BitmapGallery from './BitmapGallery';

const ShowBitmap = () => {
    const { userId } = useParams();
    const [userDetails, setUserDetails] = useState(null);
    const [userBitmaps, setUserBitmaps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchUserDetails = async () => {
        try {
            const response = await fetch(`https://grozziieget.zjweiting.com:3091/CustomerService-Chat/api/dev/user/${userId}`);
            // const response = await fetch(`https://jiapuv.com:3091/CustomerService-ChatCN/api/dev/user/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user details');
            }
            const data = await response.json();
            setUserDetails(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    const fetchUserBitmap = async () => {
        try {
            const response = await fetch(`https://grozziieget.zjweiting.com:3091/CustomerService-Chat/api/dev/user/device/bitmap/${userId}`);
            // const response = await fetch(`https://jiapuv.com:3091/CustomerService-ChatCN/api/dev/user/device/bitmap/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user details');
            }
            const data = await response.json();
            setUserBitmaps(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetch user details from API


        fetchUserDetails();
        fetchUserBitmap();
    }, [userId]);

    if (loading) {
        return <div>Loading user details...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userDetails) {
        return <div>No user details available</div>;
    }



    return (
        <div className="p-6 min-h-screen  text-slate-500">
            <h2 className="text-3xl font-bold mb-6 text-center">User Details</h2>
            <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-lg mx-auto">
                <h3 className="text-xl font-semibold mb-4">{userDetails.userName}</h3>
                <p><strong>User ID:</strong> {userDetails.userId}</p>
                <p><strong>Country:</strong> {userDetails.country}</p>
                <p><strong>State Area:</strong> {userDetails.stateArea}</p>
                <p><strong>Device Model:</strong> {userDetails.deviceModel}</p>
                <p><strong>Address Type (Bitmap State):</strong> {userDetails.addressType ? 'True' : 'False'}</p>



            </div>
            {/* Bitmap showing component */}
            <BitmapGallery
                imagesArray={userBitmaps}
            ></BitmapGallery>
            {/* Add additional details here as needed */}
            <div className="mt-4">
                <button
                    onClick={() => window.history.back()}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default ShowBitmap;
