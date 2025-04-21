import { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';

const Login = () => {

    const [disabled , setDisabled] = useState(true);
    const {signIn, setUser} = useContext(AuthContext)

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    useEffect( () =>{
        loadCaptchaEnginge(6); 
    } ,[])

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log({email, password})

        signIn(email, password)
        .then(res => {
            console.log(res.user);
            setUser(res.user);
            toast.success("Login Succeed");
            navigate(from, {replace: true});
        } )
    }

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if(validateCaptcha(user_captcha_value)){
            setDisabled(false);
        }
        else{
            setDisabled(true);
        }
    }

    return (
        <>

        <Helmet>
            <title>Bistro Boss | Login</title>
        </Helmet>

        <div className="hero bg-green-50 min-h-screen ">
            <div className="hero-content flex-col ">
                <div className="text-center md-w-1/2 ">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6 text-xl mx-[10%]">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-sky-50 w-[65%]  shrink-0 shadow-2xl ">
                    <form onSubmit={handleLogin} className=" flex flex-col items-start gap-7 justify-center p-10">
                        <div className="form-control w-full flex flex-col justify-start">
                            <label className="label ">
                                <span className=" text-2xl label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered w-full" required />
                        </div>
                        <div className="form-control w-full flex flex-col">
                            <label className="label">
                                <span className=" text-2xl label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered w-full" required />
                            <label className="label">
                                <a href="#" className=" text-xl label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control w-full flex flex-col">
                            <label className="label">
                                <LoadCanvasTemplate />
                            </label>
                            <input onBlur={handleValidateCaptcha}  type="text" name='captcha' placeholder="type the captcha" className="input input-bordered w-full" required />
                           
                        </div>
                        <div className="form-control mt-6">
                            <input disabled={disabled} className='btn btn-primary' type="submit" value="Login" />
                        </div>
                    </form>
                    <div className='text-center my-5 text-xl'><p>New Here? <Link className='text-green-500' to={'/signup'}>Create an account</Link></p></div>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
        </>
    );
};

export default Login;