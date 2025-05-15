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


    return (
        <div>

            <Navbar></Navbar>
            <div className="grid grid-cols-5 lg:gap-3">
                <div className="hidden lg:block col-span-1 shadow-lg rounded-lg">
                    <ul data-aos="fade-up-right" data-aos-duration="2000" className="menu w-full text-start pb-20 ">

                        {
                            user?.isAdmin === "true" && <>
                                <li><Link to='/admin/users' className="sm:text-xs md:text-base text-gray-700">All Users</Link></li>
                                <li><Link to='/admin/questionAnswer' className="sm:text-xs md:text-base text-gray-700">Add Q&A, Profile, Support Link</Link></li>
                                <li><Link to='/admin/warehouse&cities' className="sm:text-xs md:text-base text-gray-700">Add Warehouse&Cities</Link></li>
                                <li><Link to='/admin/modelHightWidth' className="sm:text-xs md:text-base text-gray-700">Add Bluetooth Model H&W</Link></li>
                                <li><Link to='/admin/wifiModelHightWidth' className="sm:text-xs md:text-base text-gray-700">Add Wifi Model H&W</Link></li>
                                <li><Link to='/admin/icon' className="sm:text-xs md:text-base text-gray-700">Add Icons</Link></li>
                                <li><Link to='/admin/backgroundImg' className="sm:text-xs md:text-base text-gray-700">Add Background Image & Video</Link></li>
                                <li><Link to='/admin/adminBackgroundImg' className="sm:text-xs md:text-base text-gray-700">Add Admin Background Image</Link></li>
                                <li><Link to='/admin/mallProduct' className="sm:text-xs md:text-base text-gray-700">Add Mall Products</Link></li>
                                <li><Link to='/admin/eventProduct' className="sm:text-xs md:text-base text-gray-700">Add Event Products</Link></li>
                                <li><Link to='/admin/shopifyInfo' className="sm:text-xs md:text-base text-gray-700">Add Shopify & Others Info</Link></li>
                                <li><Link to='/admin/userBaseBitmap' className="sm:text-xs md:text-base text-gray-700">User Base Bitmap</Link></li>
                                <li><Link to='/admin/powerBank' className="sm:text-xs md:text-base text-gray-700">Power Bank</Link></li>
                            </>
                        }

                    </ul>
                </div>
                <div className="col-span-5 lg:col-span-4 shadow-lg rounded-lg " >


                    <Outlet></Outlet>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Admin;