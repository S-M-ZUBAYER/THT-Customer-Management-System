import React from 'react';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin7Line } from 'react-icons/ri';

const EventProducts = () => {

    const mallProducts = [
        {
            ProductName: "Dot Printer",
            Model: "vz474gh",
           
    
        },
        {
            ProductName: "Dot Printer",
            Model: "vz474gh",
           
    
        },
        {
            ProductName: "Thermal Printer",
            Model: "vz474gh",
           
    
        },
        {
            ProductName: "Dot Matrix Printer",
            Model: "vz474gh",
           
    
        },
        {
            ProductName: "Dot Printer",
            Model: "vz474gh",
           
    
        },
        {
            ProductName: "Dot Printer",
            Model: "vz474gh",
           
    
        },
       
    ];
    
    const handleToEdit=()=>{
    console.log("Edit CLick")
    }
    
    const handleToDelete=()=>{
    console.log("Delete CLick")
    }


    const handleSubmit=()=>{
    console.log("submit")
    }


    

    return (
        <div>
        <h1 className="my-5 text-lg font-semibold">
            User Information
        </h1>
        {
            mallProducts.map((Element, index) => {
                return <div className="mx-2 my-2 grid grid-cols-3  text-start bg-slate-200 rounded-lg px-2 py-1">
                    <div className=" col-span-2 grid grid-cols-2">
                        <p>
                            {Element?.ProductName}
                        </p>
                        <p className="md:col-span-2 lg:col-span-1">
                            {Element?.Model}
                        </p> 
                    </div>
                       
                        <div className="flex items-center justify-around">
                          <FiEdit onClick={handleToEdit} className="hover:cursor-pointer"></FiEdit>
                        <RiDeleteBin7Line onClick={handleToDelete}  className="hover:cursor-pointer"></RiDeleteBin7Line>  
                            </div>
                        
                    

                </div>
            })
        }

<button
        className="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 my-10 px-20 rounded-lg"
        onClick={handleSubmit}
      >
        Add
      </button>

    </div>
    );
};

export default EventProducts;