import React, { createContext, useState } from 'react';


export  const AllProductContext = createContext(null)



const ProductContext = ({ children }) => {

// const [product,setProduct]=useState({});
// // const [allProduct,setAllProduct]=useState(true);





    const productInfo = "First info "

    return (
        <AllProductContext.Provider value={productInfo}>
            {children}
        </AllProductContext.Provider>
    );
};

export default ProductContext;