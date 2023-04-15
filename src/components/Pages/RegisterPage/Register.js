import React, { useContext, useState } from 'react';
import { Form, Link, Navigate } from 'react-router-dom';
import { GrFacebook, GrGoogle } from "react-icons/gr";
import { BsEyeFill, BsWechat } from "react-icons/bs";
import { RiEyeCloseLine } from 'react-icons/ri';
import { AuthContext } from '../../../context/UserContext';
import registerLogo from "../../../Assets/Images/Register/register-logo.jpg"
import googleLogo from "../../../Assets/Images/Icons/gmailLogo.jpg"
import facebookLogo from "../../../Assets/Images/Icons/facebookLogo.png"
import wechatLogo from "../../../Assets/Images/Icons/wechatLogo.png"
import AddFile from "../../../Assets/Images/Icons/AddFile.jpg"

// upload image
import { useCallback } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';


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

    const [matchError, setMatchError] = useState(null);
    const [lengthError, setLengthError] = useState(null);

    const [fileError, setFileError] = useState(null);



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



    // image upload
    const handleFileUpload = useCallback(async (acceptedFiles) => {
        const apiKey = process.env.REACT_APP_IMG_BB_API_KEY;
        const formData = new FormData();
        formData.append('image', acceptedFiles[0]);
        try {
            const response = await axios.post(
                `https://api.imgbb.com/1/upload?key=${apiKey}`,
                formData
            );
            console.log(response.data.data.display_url); // Do something with the image URL
        } catch (error) {
            console.log(error);
        }
    }, []);



    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length === 0) {
            setFileError('Please select a file.');
        } else if (acceptedFiles[0].type !== 'image/jpeg' && acceptedFiles[0].type !== 'image/png') {
            setFileError('Please select a JPG or PNG image.');
        } else {
            setFileError(null);
            handleFileUpload(acceptedFiles);
        }
    }, [handleFileUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png',
    });

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



    //Registration part with firebase
    const { createUser, signInWithGoogle, signInWithFacebook } = useContext(AuthContext)

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        if (password.length < 6) {
            setLengthError("Your Password have to minimum 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            setMatchError("Your Password did not match");
            return;
        }
        // handle form submission logic here
        createUser(email, password)
            .then(result => {
                const user = result.user;
                form.reset();

            })
            .catch(err => {
                console.log(err)
            })
    };
    const handleToGoogleLogIn = () => {
        signInWithGoogle()
            .then(result => {
                const user = result.user;
                console.log(user);
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleToFaceBookLogIn = () => {
        signInWithFacebook()
            .then(result => {
                const user = result.user;
                Navigate("/")
                console.log(user);
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <div className="md:flex shadow-lg justify-around items-center  md:mx-20 sm:px-5 px-3  lg:mx-48 my-20 rounded-lg">
            <div className="bg-white flex justify-center items-center w-full md:w-5/6 lg:w-2/5  ">
                <div className=" w-full my-12" >
                    <h2 className="text-2xl mb-6 text-[#004368] font-semibold my-4">Create an account</h2>

                    <div className="text-2xl" >
                        <button onClick={handleToGoogleLogIn} className="mr-8">
                            <img className="h-9 w-9" src={googleLogo} alt='google'></img>
                        </button>
                        <button onClick={handleToFaceBookLogIn} className="mr-8">
                            <img className="h-9 w-9" src={facebookLogo} alt='facebook'></img>
                        </button>
                        <button>
                            <img className="h-9 w-9" src={wechatLogo} alt='wechat'></img>
                        </button>
                    </div>

                    <div className="my-2 text-slate-500">or</div>
                    <form onSubmit={handleSubmit}>

                        <input className=" w-full pl-2" placeholder="username or email" type="email" id="email" value={email} onChange={handleEmailChange} />
                        <hr className=" border-slate-400 mb-6 my-1" ></hr>


                        <div className='relative my-2'>
                            <div className='flex items-center'>
                                <input className=" w-full pl-2" placeholder="password" type={showPassword ? "text" : "password"} id="password" value={password} onChange={handlePasswordChange} />
                                <button className="absolute right-0 pr-2" onClick={handleToShowPassword}>
                                    {
                                        showPassword ? <BsEyeFill className="text-slate-500"></BsEyeFill> : <RiEyeCloseLine className="text-slate-500"></RiEyeCloseLine>
                                    }

                                </button>
                            </div>

                            <hr className=" border-slate-400 mb-6 my-1" ></hr>
                            <p className="text-xs text-red-600 ml-2 text-start">{lengthError}</p>
                        </div>

                        <div className='relative my-2'>
                            <div className='flex items-center'>
                                <input className=" w-full pl-2" placeholder="confirm password" type={showConfirmPassword ? "text" : "password"} id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                                <button className="absolute right-0 pr-2" onClick={handleToShowConfirmPassword}>
                                    {
                                        showConfirmPassword ? <BsEyeFill className="text-slate-500"></BsEyeFill> : <RiEyeCloseLine className="text-slate-500"></RiEyeCloseLine>
                                    }

                                </button>
                            </div>

                            <hr className=" border-slate-400 mb-6 my-1" ></hr>
                            <p className="text-xs text-red-600 ml-2 text-start">{matchError}</p>
                        </div>

                        <input className=" w-full pl-2" placeholder="phone number" type="digit" id="phone" value={phone} onChange={handlePhoneChange} />
                        <hr className=" border-slate-400 mb-6 my-1" ></hr>

                        <input className=" w-full pl-2" placeholder="Designation" type="text" id="designation" value={designation} onChange={handleDesignationChange} />
                        <hr className=" border-slate-400 mb-6 my-1" ></hr>

                        <input className=" w-full pl-2" placeholder="country" type="text" id="country" value={country} onChange={handleCountryChange} />
                        <hr className=" border-slate-400 mb-6 my-1" ></hr>

                        <input className=" w-full pl-2" placeholder="language" type="text" id="language" value={language} onChange={handleLanguageChange} />
                        <hr className=" border-slate-400 mb-8" ></hr>


                        <div
                            {...getRootProps()}
                            className="mb-10"
                        >
                            <input {...getInputProps()} />
                            {isDragActive ? (
                                <p className="text-lg font-medium text-gray-500">Drop the files here ...</p>
                            ) : (
                                <>
                                    <div className="w-full h-10 flex items-center pl-2 shadow-lg cursor-pointer text-slate-400 rounded-md border  ">
                                        <div>
                                            <img className="w-6 h-6 " src={AddFile}></img>
                                        </div>
                                        <div className="ml-3">
                                            Add Image
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        {fileError && <p className="mt-2 text-sm text-red-500">{fileError}</p>}


                        <div className="my-2 ">
                            <button className="bg-[#004368] text-white w-full py-2 text-xl font-semibold rounded-md" type="submit">Register</button>
                        </div>
                    </form>
                    <div className="text-sm my-3">
                        Already have an account? <Link className="font-semibold text-[#65ABFF]" to="/login">Sign In</Link>
                    </div>
                </div>
            </div>
            <div className=" sm:hidden lg:block flex items-center justify-center">
                <img className="h-3/4 w-2/3" src={registerLogo} alt='RegisterLogo' ></img>

            </div>
        </div>
    );
};

export default Register;