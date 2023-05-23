import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin7Line } from 'react-icons/ri';



const handleToEdit = () => {
    console.log("Edit CLick")
}

const handleToDelete = () => {
    console.log("Delete CLick")
}

 

const AllUsers = () => {
    const [users, setUsers] = useState([]);

    axios.get('http://localhost:5000/tht/allUsers')
  .then(response => {
    setUsers(response.data);
  })                 
  .catch(error => {
    console.log(error);
  });


   


    return (
        <div className="w-full pb-20">
            <h1 className="my-5 text-lg font-semibold">
                User Information
            </h1>
            <div>
    </div>

            <div className=" w-11/12 mx-auto py-2 my-2 grid lg:grid-cols-12 text-start text-lg font-semibold bg-slate-300  px-2">
                <div className=" col-span-12 lg:col-span-7 grid grid-cols-3 my-2 lg:my-0">
                    <p>
                        Name
                    </p>
                    <p className="">
                        Email
                    </p>
                    <p>
                        Phone No
                    </p>
                </div>
                <div className=" col-span-12 lg:col-span-5 grid grid-cols-5">
                    <p className="col-span-2">
                        Designation
                    </p>
                    <p>
                        Country
                    </p>
                    <p>
                        Language
                    </p>

                    <div className="grid grid-cols-2 pt-1">
                        <FiEdit onClick={handleToEdit} className="hover:cursor-pointer"></FiEdit>
                        <RiDeleteBin7Line onClick={handleToDelete} className="hover:cursor-pointer"></RiDeleteBin7Line>
                    </div>

                </div>

            </div>
            {
                users.map((Element, index) => {
                    return <button key={index} className=" w-11/12 mx-auto py-2 my-2 grid lg:grid-cols-12 text-start bg-slate-100 hover:bg-cyan-50 cursor-pointer rounded-lg px-2 ">
                        <div className=" col-span-12 lg:col-span-7 grid grid-cols-3 my-2 lg:my-0">
                            <p>
                                {Element?.name}
                            </p>
                            <p className="">
                                {Element?.email}
                            </p>
                            <p>
                                {Element?.phone}
                            </p>
                        </div>
                        <div className=" col-span-12 lg:col-span-5 grid grid-cols-5">
                            <p className="col-span-2">
                                {Element?.designation}
                            </p>
                            <p>
                                {Element?.country}
                            </p>
                            <p>
                                {Element?.language}
                            </p>

                            <div className="grid grid-cols-2">
                                <FiEdit onClick={handleToEdit} className="hover:cursor-pointer"></FiEdit>
                                <RiDeleteBin7Line onClick={handleToDelete} className="hover:cursor-pointer"></RiDeleteBin7Line>
                            </div>

                        </div>

                    </button>
                })
            }



        </div>
    );
};

export default AllUsers;