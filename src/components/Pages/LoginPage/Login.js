import React from 'react';
import { useState } from 'react';
import { GrFacebook, GrGoogle } from "react-icons/gr";
import { BsEyeFill, BsWechat } from "react-icons/bs";
import { RiEyeCloseLine } from "react-icons/ri";
// import { BsEyeFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [show, setShow]=useState(false)

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email,password)
        // handle form submission logic here
    };


    const handleToShow = (event) => {
        event.preventDefault();
    setShow(!show)
        // handle form submission logic here
    };


    const handleForgotPasswordClick = () => {
        // handle forgot password click logic here
    };

    return (
        <div className="bg-white flex justify-center items-center">
            <div className="bg-slate-300 w-1/3 my-12 py-10 px-12" >
                <h2 className="text-2xl font-semibold my-4">Sign In</h2>

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

                <div className="my-3">or</div>
                <form onSubmit={handleSubmit}>
                    {/* <label htmlFor="email">Email:</label> */}
                    <input className="bg-slate-300 w-full pl-2" placeholder="UserName or Email" type="email" id="email" value={email} onChange={handleEmailChange} />
                    <hr className=" border-slate-950 mb-5" ></hr>
                    {/* <label htmlFor="password">Password:</label> */}
                    <div className='relative'>
                        <div className='flex items-center'>
                         <input className="bg-slate-300 w-full pl-2" placeholder="Password" type={show? "text":"password"} id="password" value={password} onChange={handlePasswordChange} />
                        <button className="absolute right-0 pr-2" onClick={handleToShow}>
                            {
                                show?  <BsEyeFill></BsEyeFill> :<RiEyeCloseLine></RiEyeCloseLine>
                            }
                            
                        </button> 
                        </div>
                        
                        <hr className=" border-slate-950" ></hr>
                        {/* <button>digit to start</button>
                        <button>start to digit</button> */}
                    </div>
                    <div className="text-end text-sm mb-8">
                        <button type="button" onClick={handleForgotPasswordClick}>
                            Forgot password?
                        </button>
                       
                    </div>
                    <div className="my-2 ">
                         <button  className="bg-amber-200 px-20 py-1 text-xl font-semibold" type="submit">Sign In</button>
                    </div>
                </form>
                <div className="text-sm my-3">
                    Don't have an account? <Link className="font-semibold" to="/register">Create an account</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;