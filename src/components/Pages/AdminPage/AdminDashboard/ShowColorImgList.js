import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DisplaySpinner from '../../../Shared/Loading/DisplaySpinner';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { toast } from 'react-hot-toast';

const ShowColorImgList = ({ modelNumber,productId,categoryImage }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [colorImages, setColorImages] = useState("");

    console.log(categoryImage,"categoryImage")

    useEffect(() => {
        // Make a GET request to retrieve color images by model number
        axios.get(`https://grozziieget.zjweiting.com:8033/tht/colorImg/productColor/${productId}/${categoryImage}`)
        // axios.get(`http://localhost:2000/tht/colorImg/productColor/${productId}/${categoryImage}`)
            .then(response => {
                if (response.data.status === "success") {
                    // Set the retrieved color images in the state
                    setColorImages(response.data.data);
                } else {
                    // Handle the case where no color images were found or an error occurred
                    setError("Failed to retrieve color images");
                }
            })
            .catch(err => {
                // Handle the error
                setError("An error occurred while fetching color images");
            })
            .finally(() => {
                // Set loading to false when the request is completed
                setLoading(false);
            });
    }, [modelNumber]);

    console.log(colorImages,"color images")


    const handleToDeleteColorInfo = (id) => {

        const confirmed = window.confirm('Are you sure you want to delete this color image information?');
        if (!confirmed) {
          return; // Cancel the deletion if the user clicks Cancel or closes the modal
        }
        axios.delete(`https://grozziieget.zjweiting.com:8033/tht/colorInfo/delete/${id}`)
        // axios.delete(`http://localhost:2000/tht/colorInfo/delete/${id}`)
            .then(response => {
                if (response.data) {
                    setColorImages(colorImages.filter(info => info?.id !== id))
                    toast.success('Color information deleted successfully');
                } else {
                    console.error('Failed to delete color information');
                    toast.error('Failed to delete color information');
                }
            })
            .catch(error => {
                console.error('An error occurred while deleting color information:', error);
                toast.error('An error occurred while deleting color information:', error);
            });
    };


    return (
        <div>

            <div className="mx-2 mt-3 flex justify-between items-center text-start bg-gradient-to-r from-green-400 via-yellow-400 to-green-500 font-bold hover:bg-yellow-100 px-2 py-2">


                <p>
                    Img
                </p>
                <p>
                    Model
                </p>
                <p>
                    Name
                </p>
                <p>
                    Quantity
                </p>
                <p className="">
                    Type
                </p>
                <p className="">
                    Price
                </p>
                <RiDeleteBin7Line className="hover:cursor-pointer hover:text-2xl"></RiDeleteBin7Line>

            </div>
            {
                loading ?
                    <DisplaySpinner></DisplaySpinner>
                    :
                    (
                        colorImages?.length === 0
                            ?
                            <span className="text-xl font-bold text-red-400">No Color Images Available for {modelNumber}</span>
                            :

                            colorImages?.map((colorImage, index) => (
                                <div key={index} className="mx-2 my-3 flex justify-between items-center text-start bg-slate-200 hover:bg-yellow-100  rounded-lg px-2 py-2">

                                    <img className=" h-10 w-10 rounded-full" src={`https://grozziieget.zjweiting.com:8033/tht/colorImages/${colorImage.colorImage}`} alt={colorImage.colorName} ></img>
                                    {/* <img className=" h-10 w-10 rounded-full" src={`http://localhost:2000/tht/colorImages/${colorImage.colorImage}`} alt={colorImage.colorName} ></img> */}

                                    <p>
                                        {modelNumber}
                                    </p>
                                    <p>
                                        {colorImage?.colorName}
                                    </p>
                                    <p>
                                        {colorImage?.colorProductQuantity}
                                    </p>
                                    <p className="">
                                        {colorImage?.typeName}
                                    </p>
                                    <p className="">
                                        {colorImage?.colorProductPrice}
                                    </p>
                                    <RiDeleteBin7Line onClick={() => handleToDeleteColorInfo(colorImage?.id)} className="hover:cursor-pointer hover:text-2xl"></RiDeleteBin7Line>

                                </div>
                            )))}
        </div>
    );
};

export default ShowColorImgList;
