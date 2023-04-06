import React from 'react';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin7Line } from 'react-icons/ri';

const users = [
    {
        name: "s m zubayer",
        email: "smzubayer9004@gmail.com",
        phone: "+8801304979278",
        designation: "Web Developer",
        country: "Bangladesh",
        region: "Islam",
        language: "Bengali"

    },
    {
        name: "s m sabit",
        email: "smzubayer9004@gmail.com",
        phone: "+8801304979278",
        designation: "Web Developer",
        country: "Bangladesh",
        region: "Islam",
        language: "Bengali"

    },
    {
        name: "md pias",
        email: "smzubayer9004@gmail.com",
        phone: "+8801304979278",
        designation: "Web Developer",
        country: "Bangladesh",
        region: "Islam",
        language: "Bengali"

    },
    {
        name: "Mir sultan",
        email: "smzubayer9004@gmail.com",
        phone: "+8801304979278",
        designation: "Web Developer",
        country: "Bangladesh",
        region: "Islam",
        language: "Bengali"

    },
    {
        name: "arif khan",
        email: "smzubayer9004@gmail.com",
        phone: "+8801304979278",
        designation: "Web Developer",
        country: "Bangladesh",
        region: "Islam",
        language: "Bengali"

    },
];

const handleToEdit=()=>{
console.log("Edit CLick")
}

const handleToDelete=()=>{
console.log("Delete CLick")
}



const AllUsers = () => {
    return (
        <div>
            <h1 className="my-5 text-lg font-semibold">
                User Information
            </h1>
            {
                users.map((Element, index) => {
                    return <div className="mx-2 my-2 grid md:grid-cols-1 lg:grid-cols-3 text-start bg-slate-200 rounded-lg px-2 py-1">
                        <div className="col-span-2 grid md:grid-cols-5 lg:grid-cols-4 ">
                            <p>
                                {Element?.name}
                            </p>
                            <p className="md:col-span-2 lg:col-span-1">
                                {Element?.email}
                            </p>
                            <p>
                                {Element?.phone}
                            </p>
                            <p>
                                {Element?.designation}
                            </p>
                        </div>
                        <div className="grid grid-cols-4">
                            <p>
                                {Element?.country}
                            </p>
                            <p>
                                {Element?.region}
                            </p>
                            <FiEdit onClick={handleToEdit} className="hover:cursor-pointer"></FiEdit>
                            <RiDeleteBin7Line onClick={handleToDelete}  className="hover:cursor-pointer"></RiDeleteBin7Line>
                        </div>

                    </div>
                })
            }



        </div>
    );
};

export default AllUsers;