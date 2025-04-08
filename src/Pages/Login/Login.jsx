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

        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col md:flex-row">
                <div className="text-center md-w-1/2 ">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6 ">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <LoadCanvasTemplate />
                            </label>
                            <input onBlur={handleValidateCaptcha}  type="text" name='captcha' placeholder="type the captcha" className="input input-bordered" required />
                           
                        </div>
                        <div className="form-control mt-6">
                            <input disabled={disabled} className='btn btn-primary' type="submit" value="Login" />
                        </div>
                    </form>
                    <p className='text-center my-5'><small>New Here? <Link className='text-green-500' to={'/signup'}>Create an account</Link></small></p>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
        </>
    );
};

export default Login;