import React, { createContext, useState } from 'react';

export const AllProductContext = createContext();


const ProductContextProvider = ({ children }) => {
    const [Product, setProduct] = useState();

    const [name, setName] = useState();
    const [language, setLanguage] = useState();
    const [allMallProduct, setAllMallProduct] = useState();
    const [allEventProduct, setAllEventProduct] = useState();
    const [showData, setShowData] = useState("");
    // setVideos([Product?.allVideos])
    // setImages([Product?.allImages])

    const productInfo = { Product, setProduct, allMallProduct, setAllMallProduct, allEventProduct, setAllEventProduct, language, setLanguage, showData, setShowData }
    return (
        <AllProductContext.Provider value={productInfo}>
            {children}
        </AllProductContext.Provider>
    );
};

export default ProductContextProvider;