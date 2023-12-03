import React, { useState } from 'react';
import { reduceImageResolution, reduceImagesResolution } from './Warehouse&Cities.js/functionForImageResulation';

const EditProductInfo = ({ closeModal, handleSubmit }) => {
    //edit
    const [productImg, setProductImg] = useState([]);
    const [productImgLink, setProductImgLink] = useState("");
    const [productImgRemark, setProductImgRemark] = useState("");
    const [productCountryName, setProductCountryName] = useState('');
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');
    const [modelNumber, setModelNumber] = useState('');


    const handleProductImgUpload = (event) => {
        // extract the current date and time components
        const preFile = event.target.files[0];
        const file = reduceImageResolution(preFile, 1000);
        file.then((fileObject) => {
            setProductImg(fileObject);
        });


    };

    const handleProductImgLink = (e) => {
        setProductImgLink(e.target.value);

    }

    const handleProductImageRemark = (e) => {
        setProductImgRemark(e.target.value);

    }
    const handleProductCountryNameChange = (e) => {
        setProductCountryName(e.target.value);
    };
    const handleProductNameChange = (e) => {
        setProductName(e.target.value);
    };
    const handleProductPriceChange = (e) => {
        setProductPrice(e.target.value);
    };

    const handleProductDescriptionChange = (e) => {
        setProductDescription(e.target.value);
    };
    return (
        <div>
            <div className="modal">
                <div className="fixed inset-0 flex items-center justify-center mx-auto rounded-lg h-5/6 w-5/6 bg-gray-600 bg-opacity-50">
                    <div className="bg-white p-8">
                        <h2 className="text-lg font-bold mb-4">Edit Product information</h2>
                        <input type="file"
                            onChange={handleProductImgUpload}
                            className="bg-[#004368] hover:bg-blue-700 text-white font-bold py-2 my-10 px-3 lg:px-10 lg:ml-5 rounded-lg "
                            accept="image/*" />

                        <div>
                            <div className="mb-4 grid  grid-cols-3 text-start">
                                <label htmlFor="modelNumber" className="block col-span-1 text-gray-500 font-semibold mb-2">
                                    Product Img Link
                                </label>
                                <input
                                    type="text"
                                    id="productImgLink"
                                    className="shadow col-span-2  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                                    value={productImgLink}
                                    placeholder='Enter the product Image link'
                                    onChange={handleProductImgLink}

                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="productImageRemark" className="block text-start text-gray-700 font-bold mb-2">
                                    Product Image Remarks
                                </label>
                                <textarea
                                    id="productImageRemark"
                                    placeholder="Add product Image Remark"
                                    className="shadow resize-none appearance-none border rounded-lg w-full h-44  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                                    value={productImgRemark}
                                    onChange={handleProductImageRemark}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 p-8">
                        {/* <form onSubmit={handleSubmit}> */}
                        <div className="mb-4">
                            <select
                                id="productCountryCategory"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                                value={productCountryName}
                                onChange={handleProductCountryNameChange}
                                required
                            >
                                <option value="">Select Country Category</option>
                                <option value="zh-CN">中文</option>
                                <option value="en-US">English</option>
                                <option value="th-TH">ไทย</option>
                                <option value="fil-PH">Philippines</option>
                                <option value="vi-VN">Tiếng Việt</option>
                                <option value="ms-MY">Malaysia</option>
                                <option value="id-ID">Indonesia</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <select
                                id="productName"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                                value={productName}
                                onChange={handleProductNameChange}
                                required
                            >
                                <option value="">Select Product</option>
                                <option value="Dot Printer">Dot Printer</option>
                                <option value="Thermal Printer">Thermal Printer</option>
                                <option value="Attendance Machine">Attendance Machine</option>
                            </select>
                        </div>


                        <div className="mb-4">

                            <input
                                type="digit"
                                id="productPrice"
                                placeholder='Product Price'
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                                value={productPrice}
                                onChange={handleProductPriceChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="productDescription" className="block text-start text-gray-700 font-bold mb-2">
                                Product Description
                            </label>


                            <textarea
                                id="productDescription"
                                placeholder="Add Product description"
                                className="shadow resize-both appearance-none border rounded-lg w-full min-h-20 max-h-100 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                                value={productDescription}
                                onChange={handleProductDescriptionChange}
                                required
                                rows={5} // Initial number of visible text lines
                            ></textarea>


                        </div>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"

                        >
                            Save
                        </button>
                    </div>
                    <p></p>
                </div>
                <button onClick={closeModal}>Cancel</button>
                <button onClick={handleSubmit}>Edit</button>
            </div>
        </div>
    );
};

export default EditProductInfo;