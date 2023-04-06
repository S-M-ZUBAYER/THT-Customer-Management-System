import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GrFacebook, GrGoogle } from "react-icons/gr";
import { BsEyeFill, BsWechat } from "react-icons/bs";
import { RiEyeCloseLine } from 'react-icons/ri';

const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [designation, setDesignation] = useState('');
    const [country, setCountry] = useState('');
    const [language, setLanguage] = useState('');

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };
    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };
    const handleDesignationChange = (event) => {
        setDesignation(event.target.value);
    };
    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email, password, confirmPassword, phone, designation, language, country)
        // handle form submission logic here
    };


    const handleToShowPassword = (event) => {
        event.preventDefault();
        setShowPassword(!showPassword)
        // handle form submission logic here
    };
    const handleToShowConfirmPassword = (event) => {
        event.preventDefault();
        setShowConfirmPassword(!showConfirmPassword)
        // handle form submission logic here
    };



    return (
        <div className="md:flex shadow-lg justify-around items-center mx-20 sm:px-5 md:px-0  lg:mx-48 my-20">
            <div className="bg-white flex justify-center items-center w-2/5">
                <div className=" w-full my-12 py-10" >
                    <h2 className="text-2xl font-semibold my-4">Create an account</h2>

                    <div className="text-2xl" >
                        <button className="mr-8">
                            <GrGoogle></GrGoogle>
                        </button>
                        <button className="mr-8">
                            <GrFacebook></GrFacebook>
                        </button>
                        <button>
                            <BsWechat></BsWechat>
                        </button>
                    </div>

                    <div className="my-2">or</div>
                    <form onSubmit={handleSubmit}>

                        <input className=" w-full pl-2" placeholder="username or email" type="email" id="email" value={email} onChange={handleEmailChange} />
                        <hr className=" border-slate-300 mb-5" ></hr>


                        <div className='relative my-2'>
                            <div className='flex items-center'>
                                <input className=" w-full pl-2" placeholder="password" type={showPassword ? "text" : "password"} id="password" value={password} onChange={handlePasswordChange} />
                                <button className="absolute right-0 pr-2" onClick={handleToShowPassword}>
                                    {
                                        showPassword ? <BsEyeFill className="text-slate-400"></BsEyeFill> : <RiEyeCloseLine className="text-slate-400"></RiEyeCloseLine>
                                    }

                                </button>
                            </div>

                            <hr className=" border-slate-300 mb-5" ></hr>

                        </div>

                        <div className='relative my-2'>
                            <div className='flex items-center'>
                                <input className=" w-full pl-2" placeholder="confirm password" type={showConfirmPassword ? "text" : "password"} id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                                <button className="absolute right-0 pr-2" onClick={handleToShowConfirmPassword}>
                                    {
                                        showConfirmPassword ? <BsEyeFill className="text-slate-400"></BsEyeFill> : <RiEyeCloseLine className="text-slate-400"></RiEyeCloseLine>
                                    }

                                </button>
                            </div>

                            <hr className=" border-slate-300 mb-5" ></hr>

                        </div>

                        <input className=" w-full pl-2" placeholder="phone number" type="digit" id="phone" value={phone} onChange={handlePhoneChange} />
                        <hr className=" border-slate-300 mb-5" ></hr>

                        <input className=" w-full pl-2" placeholder="Designation" type="text" id="designation" value={designation} onChange={handleDesignationChange} />
                        <hr className=" border-slate-300 mb-5" ></hr>

                        <input className=" w-full pl-2" placeholder="country" type="text" id="country" value={country} onChange={handleCountryChange} />
                        <hr className=" border-slate-300 mb-5" ></hr>

                        <input className=" w-full pl-2" placeholder="language" type="text" id="language" value={language} onChange={handleLanguageChange} />
                        <hr className=" border-slate-300 mb-8" ></hr>

                        <div className="my-2 ">
                            <button className="bg-amber-200 w-full py-2 text-xl font-semibold rounded-md" type="submit">Register</button>
                        </div>
                    </form>
                    <div className="text-sm my-3">
                        Don't have an account? <Link className="font-semibold" to="/register">Create an account</Link>
                    </div>
                </div>
            </div>
            <div className="inline-block">
                <svg width="200" height="200" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.2" d="M150 240C150 250.5 151.95 260.55 155.25 270H30C22.0435 270 14.4129 266.839 8.78679 261.213C3.1607 255.587 0 247.956 0 240V30C0 13.5 13.5 0 30 0H240C247.956 0 255.587 3.1607 261.213 8.78679C266.839 14.4129 270 22.0435 270 30V155.25C260.55 151.95 250.5 150 240 150V30H30V240H150ZM164.4 139.35L123.15 192.45L93.75 157.05L52.5 210H155.25C161.25 193.2 172.05 178.65 186 168.15L164.4 139.35ZM255 225V180H225V225H180V255H225V300H255V255H300V225H255Z" fill="black" />
                </svg>

            </div>
        </div>
    );
}; 

export default Register;