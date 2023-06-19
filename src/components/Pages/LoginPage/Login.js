import React, { useContext } from 'react';
import { useState } from 'react';
import { GrFacebook, GrGoogle } from "react-icons/gr";
import { BsEyeFill, BsWechat } from "react-icons/bs";
import { RiEyeCloseLine } from "react-icons/ri";
// import { BsEyeFill } from "react-icons/bs";
import { Form, Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/UserContext';
import googleLogo from "../../../Assets/Images/Icons/gmailLogo.jpg"
import facebookLogo from "../../../Assets/Images/Icons/facebookLogo.png"
import wechatLogo from "../../../Assets/Images/Icons/wechatLogo.png"
import { AllProductContext } from '../../../context/ProductContext';
import { toast } from 'react-hot-toast';
import BtnSpinner from '../../Shared/Loading/BtnSpinner';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const location=useLocation();
    const navigate=useNavigate();
    const {setLanguage}=useContext(AllProductContext);
   

    const [show, setShow]=useState(false)

    const {signIn,signInWithGoogle,signInWithFacebook,resetPassword, loading,setLoading}=useContext(AuthContext);

    const from=location?.state?.from?.pathname || "/";


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(email===""||password===""){
            toast.error("please input all the information properly")
            return;
        }
        setLoading(true);
        const form=event.target;
        // handle form submission logic here
        signIn(email,password)
        .then(result=>{
            const user=result.user;
            setLoading(false);
            navigate(from,{replace:true})
            form.reset();
           
        })
        .catch(err=>{
            toast.error("Invalid User Name Or Password")
            console.log(err);
            setLoading(false);
        })
    };


    const handleToShow = (event) => {
        event.preventDefault();
    setShow(!show)
        // handle form submission logic here
    };

    const handleToGoogleLogIn=()=>{
        signInWithGoogle()
        .then(result=>{
            const user=result.user;
            if(user){
                toast.success("Welcome to THT-Space Electrical Company Ltd Customer service site")
            }
            navigate("/")
            console.log(user);
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const handleToFaceBookLogIn=()=>{
        signInWithFacebook()
        .then(result=>{
            const user=result.user;
            navigate("/")
            console.log(user);
        })
        .catch(err=>{
            console.log(err)
        })
    }
    


    const handleToResetPassword = () => {
        resetPassword(email)
            .then(() => {
                console.log(email)
                toast.success('Please check your email to reset')
                // setLoading(false);
            })
            .catch(err => {
                toast.error(err.message);
                console.log(err);
                // setLoading(false);
            })
    }

    return (
        <div className="bg-white flex justify-center items-center">
            <div className="shadow-lg lg:w-1/3 my-12 py-10 px-12" >
                <h2 className="text-2xl text-[#004368] mb-8 font-semibold my-4">Sign In</h2>

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

                <div className="my-3">or</div>
                <form onSubmit={handleSubmit}>
                    {/* <label htmlFor="email">Email:</label> */}
                    <input className=" w-full pl-2" placeholder="username or email" type="email" id="email" value={email} onChange={handleEmailChange} />
                    <hr className="  mb-10" ></hr>
                    {/* <label htmlFor="password">Password:</label> */}
                    <div className='relative'>
                        <div className='flex items-center'>
                         <input className=" w-full pl-2" placeholder="password" type={show? "text":"password"} id="password" value={password} onChange={handlePasswordChange} />
                        <button className="absolute right-0 pr-2" onClick={handleToShow}>
                            {
                                show?  <BsEyeFill className="text-slate-500"></BsEyeFill> :<RiEyeCloseLine className="text-slate-500"></RiEyeCloseLine>
                            }
                            
                        </button> 
                        </div>
                        
                        <hr className=" " ></hr>
                        {/* <button>digit to start</button>
                        <button>start to digit</button> */}
                    </div>
                    <div className="text-end text-sm mb-8">
                        <button type="button" className="text-[#65ABFF] font-semibold" onClick={handleToResetPassword}>
                            Forgot password?
                        </button>
                       
                    </div>
                    <div className="my-2 ">
                         <button  className="bg-[#004368]  text-white rounded-md px-32 py-1 text-xl font-semibold " type="submit">{
                            loading?
                            <BtnSpinner></BtnSpinner>
                            :"Sign In"
                         }</button>
                    </div>
                </form>
                <div className="text-sm my-3">
                    Don't have an account? <Link className="font-semibold text-[#65ABFF]" to="/register">Create an account</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;