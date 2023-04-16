import React from 'react';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { BsFiletypePdf } from 'react-icons/bs';
import pdfLogo from "../../../../../Assets/Images/Icons/pdfLogo.jpg"

const Invoice = () => {
const handleToDelete=()=>{
console.log("delete")
}

const inv=[
    {
        name: "Product name",
        date: "12-02-23",
        time: "12:23"
    },
    {
        name: "Product name",
        date: "14-12-22",
        time: "11:23"
    },
    {
        name: "Product name",
        date: "17-02-19",
        time: "12:00"
    },
    {
        name: "Product name",
        date: "18-02-18",
        time: "04:23"
    },
]

    return (
        <div>
            {inv?.map((product,index)=>{
return <div key={index} className="mx-2 my-3 grid grid-cols-9  text-start bg-slate-200 hover:bg-yellow-100 cursor-pointer rounded-lg px-2 py-2">
<div className=" col-span-8 grid grid-cols-4">
   <img className="h-6 w-6" src={pdfLogo}></img>

    <p>
        {product?.name}
    </p>
    <p className="">
        {product?.date}
    </p>
    <p className="">
        {product?.time}
    </p>
</div>

<div className="flex items-center justify-around">
    <RiDeleteBin7Line onClick={handleToDelete} className="hover:cursor-pointer"></RiDeleteBin7Line>
</div>
</div>
            })}
        </div>
    );
};

export default Invoice;