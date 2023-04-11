// import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../../Shared/NavbarSection/Navbar';
import Footer from '../../Shared/FooterSection/Footer';
import { AuthContext } from '../../../context/UserContext';
// import useAdmin from '../../../Api/Hooks/UseAdmin';
// import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
// import useAdmin from '../Hooks/UseAdmin';

const Admin = () => {

const {user}=useContext(AuthContext)

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
            <div className="grid grid-cols-5 gap-3">
                <div className="col-span-1 shadow-lg rounded-lg">
                    <ul data-aos="fade-up-right" data-aos-duration="2000" className="menu w-full text-start">

                        {/* {
    isAdmin && <> */}
                        <li><Link to='/admin/users' className="sm:text-xs md:text-base">All Users</Link></li>
                        <li><Link to='/admin/questionAnswer' className="sm:text-xs md:text-base">Add Q & A</Link></li>
                        <li><Link to='/admin/icon' className="sm:text-xs md:text-base">Add Icons</Link></li>
                        <li><Link to='/admin/mallProduct' className="sm:text-xs md:text-base">Add Mall Products</Link></li>
                        <li><Link to='/admin/eventProduct' className="sm:text-xs md:text-base">Add Event Products</Link></li>
                        {/* </>
} */}

                        <Link className="text-left ml-2" to='/'>
                            <button className='px-4 py-2 mt-8 ml-0 font-semibold bg-[#004368] text-white lg:text-lg rounded  mb-5'>
                                Back to homepage
                            </button>
                        </Link>
                    </ul>
                </div>
                <div className="col-span-4 shadow-lg rounded-lg">
                    
                <div className="text-white pt-12 pb-5">
                        <img data-aos="fade-down" data-aos-duration="2000" className="h-40 w-40 rounded-full border-8 border-x-fuchsia-500 border-yellow-300 mx-auto" 
                        //  src={user?.photoURL} 
                         alt="" />
                        <div data-aos="fade-up" data-aos-duration="2000">
                            <h1 className="text-2xl text-red-300 font-bold" >
                                Hi <span className="text-lime-400">
                                    {user?.email}
                                    </span>
                            </h1>
                            <p className="text-xl text-green-300">
                                Welcome to your dashboard
                            </p>
                        </div>

                    </div>
                    <Outlet></Outlet>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Admin;