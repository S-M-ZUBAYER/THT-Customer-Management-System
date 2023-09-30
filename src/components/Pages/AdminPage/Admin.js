// import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../../Shared/NavbarSection/Navbar';
import Footer from '../../Shared/FooterSection/Footer';
import { AuthContext } from '../../../context/UserContext';


// import useAdmin from '../../../Api/Hooks/UseAdmin';
// import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
// import useAdmin from '../Hooks/UseAdmin';

const Admin = () => {

    const { user } = useContext(AuthContext);
 

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    // const { user } = useContext(AuthContext);
    // const [isAdmin] = useAdmin(user?.email)
    // const [isBuyer] = useBuyer(user?.email)
    // const [isSeller] = useSeller(user?.email)
    // const url = `https://cricket-lover-server-site-s-m-zubayer.vercel.app/users/${user?.email}`;

    // const { data: users = [], isLoading, refetch } = useQuery({
    //     queryKey: ['users'],
    //     queryFn: async () => {
    //         const res = await fetch(url, {
    //             headers: {
    //                 authorization: `bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    //             }
    //         });
    //         const data = await res.json();
    //         return data;
    //     }
    // })
    // refetch();
    return (
        <div>

            <Navbar></Navbar>
            <div className="grid grid-cols-5 lg:gap-3">
                <div className="hidden lg:block col-span-1 shadow-lg rounded-lg">
                    <ul data-aos="fade-up-right" data-aos-duration="2000" className="menu w-full text-start pb-20 ">

                        {/* {
    isAdmin && <> */}
                        <li><Link to='/admin/users' className="sm:text-xs md:text-base text-gray-700">All Users</Link></li>
                        <li><Link to='/admin/questionAnswer' className="sm:text-xs md:text-base text-gray-700">Add Q & A</Link></li>
                        <li><Link to='/admin/warehouse&cities' className="sm:text-xs md:text-base text-gray-700">Add Warehouse&Cities</Link></li>
                        <li><Link to='/admin/icon' className="sm:text-xs md:text-base text-gray-700">Add Icons</Link></li>
                        <li><Link to='/admin/backgroundImg' className="sm:text-xs md:text-base text-gray-700">Add Background Image</Link></li>
                        <li><Link to='/admin/mallProduct' className="sm:text-xs md:text-base text-gray-700">Add Mall Products</Link></li>
                        <li><Link to='/admin/eventProduct' className="sm:text-xs md:text-base text-gray-700">Add Event Products</Link></li>
                        {/* </>
} */}
{/* 
                        <Link className="text-left ml-2" to='/'>
                            <button className='px-4 py-2 mt-8 ml-0 font-semibold bg-[#004368] text-white lg:text-lg rounded  mb-5'>
                                Back to homepage
                            </button>
                        </Link> */}
                    </ul>
                </div>
                <div className="col-span-5 lg:col-span-4 shadow-lg rounded-lg mb-10">

                    
                    <Outlet></Outlet>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Admin;