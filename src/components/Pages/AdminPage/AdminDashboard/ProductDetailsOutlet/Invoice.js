import React, { useContext } from 'react';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { AiFillFileText } from 'react-icons/ai';
import pdfLogo from "../../../../../Assets/Images/Icons/pdfLogo.jpg"
import { AllProductContext } from '../../../../../context/ProductContext';

const Invoice = () => {
    const handleToDelete = () => {
        console.log("delete")
    }


    const { Product } = useContext(AllProductContext);
    const handleToDownload = () => {
        const fileUrl = `http://localhost:5000/tht/mallProductImages/${Product?.invoiceFile}`;

        fetch(fileUrl)
            .then((response) => response.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${Product?.invoiceFile}`);
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch((error) => {
                console.error('Error downloading file:', error);
            });
    }



    return (
        <div>
            <h1 className="text-2xl font-semibold text-amber-400 mb-4">Available Invoice Documents</h1>
            {/* {inv?.map((product,index)=>{ */}
            <div className="mx-2 mt-3 mb-20 grid grid-cols-9  text-start bg-slate-200 hover:bg-yellow-100 cursor-pointer rounded-lg px-2 py-2">
                <div className=" col-span-8 grid grid-cols-4" onClick={handleToDownload} >
                    {/* <img className="h-6 w-6" src={pdfLogo}></img> */}
                    <AiFillFileText className=" text-amber-400 h-6 w-6" ></AiFillFileText>

                    <p>
                        {Product?.invoiceFile}
                    </p>
                    <p className="">
                        {(Product?.date).split("T")[0]}
                    </p>
                    <p className="">
                        {Product?.time}
                    </p>
                </div>

                <div className="flex items-center justify-around">
                    <RiDeleteBin7Line onClick={handleToDelete} className="hover:cursor-pointer"></RiDeleteBin7Line>
                </div>
            </div>
            {/* })} */}
        </div>
    );
};

export default Invoice;