import React from 'react';
import { Link } from 'react-router-dom';
import img from "../../../Assets/Images/THT-Pic.jpg"
import customerServiceImg from "../../../Assets/Images/customer service/Customer service.jpg"
import Img from "../../../Assets/Images/customer service/Customer service.jpg"

const Contact = () => {
    return (
        <div>
            <section
                className="relative bg-[url(https://lh3.googleusercontent.com/p/AF1QipP1Nu_aPfi17TVr41iSkP6kZLbZhWEUVNlEsKRW=s680-w680-h510)] bg-cover bg-center bg-no-repeat"
            >
                <div
                    className="absolute inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/95 sm:to-white/25"
                ></div>

                <div
                    className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
                >
                    <div className="max-w-xl text-center sm:text-left">
                        <h1 className="text-3xl font-extrabold text-lime-700 sm:text-5xl">
                            Please Contact

                            <strong className="block font-extrabold text-yellow-500">
                                THT-Space Electrical Company Ltd
                            </strong>
                            If You Need...

                        </h1>

                        <p className="mt-4 max-w-lg sm:text-xl text-cyan-800 sm:leading-relaxed">
                            Welcome to our THT-Space Electrical Company Ltd to see and check the product and any further reason...
                        </p>
                    </div>
                </div>
            </section>

            <div className="my-24">
                <h1 className="text-amber-300 text-4xl font-extrabold mb-10">
                    Contact Us
                </h1>
                <p>
                    If you need to get in touch with us, there are several ways to do so. You can reach out to us via email, phone, or through our website's contact form.
                </p>


                <div className="grid grid-cols-1 md:grid-cols-2 pt-20">
                    <div className="flex justify-end mx-10 md:mx-5  mr-10">
                        <img className="h-full w-full rounded-lg" src={customerServiceImg} alt='customer img'></img>
                    </div>
                    <div className=" md:text-start  md:ml-28 md:mt-32">
                        <div className="my-5">
                            <h1 className="text-lg font-semibold">
                                Head Office Address
                            </h1>
                            <p>
                                123 Chaowai St, Chaoyang District, Beijing,
                                China, 100020
                            </p>
                        </div>

                        <div className="my-5">
                            <h1 className="text-lg font-semibold">
                                Contact Number
                            </h1>

                            <div>
                                <p>
                                    +000 12345 6789
                                </p>
                                <p>
                                    +000 12345 6789
                                </p>
                                <p>
                                    +000 12345 6789
                                </p>
                            </div>

                        </div>

                        <div className="my-5">
                            <h1 className="text-lg font-semibold">
                                Contact Email
                            </h1>
                            <p>
                                smzubayer9004@gmail.com
                            </p>
                        </div>
                    </div>
                </div>

            </div>


            <div>
            <div className="w-5/6 md:w-4/6 lg:w-full mx-auto">
                            <h1 className="text-3xl font-semibold text-gray-400 capitalize dark:text-white lg:text-5xl">Let’s get in touch</h1>

                            <p className="mt-4 text-gray-300 dark:text-gray-400">
                                If you need to get in touch with us, there are several ways to do so. You can reach out to us via email, phone, or through our website's contact form.
                            </p>

                            <form className="mt-12 text-slate-300">
                                <div className="-mx-2 md:items-center md:flex">
                                    <div className="flex-1 px-2">
                                        {/* <label className="block mb-2 text-sm text-gray-200 dark:text-gray-200">Full Name</label> */}
                                        <input type="text" placeholder="Your Name" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    </div>

                                    <div className="flex-1 px-2 mt-4 md:mt-0">
                                        {/* <label className="block mb-2 text-sm text-gray-200 dark:text-gray-200">Email address</label> */}
                                        <input type="email" placeholder="Your email" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    </div>
                                </div>

                                <div className="w-full mt-4">
                                    {/* <label className="block mb-2 text-sm text-gray-200 dark:text-gray-200">Message</label> */}
                                    <textarea className="block w-full h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:h-56 dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Your Message"></textarea>
                                </div>

                                <button className=" px-16 py-1 my-10 text-lg font-bold tracking-wide text-white capitalize transition-colors duration-300 transform  bg-[#004368]  rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                    Submit
                                </button>
                            </form>
                        </div>


            </div>




        </div>
    );
};

export default Contact;