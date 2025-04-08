import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UseAxiosPublic from '../../Hooks/UseAxiosPublic';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';

const SignUp = () => {

    const axiosPublic = UseAxiosPublic();
    const {createUser, setUser, updateUserProfile} = useContext(AuthContext);
    const { register, handleSubmit, reset , watch, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = data => {

        console.log(data);

        createUser(data.email, data.password)
        .then(res => {
            const loggedUser = res.user;
            console.log(loggedUser)
            setUser(loggedUser)


            updateUserProfile(data.name, data.photoURL)
            .then( () => { 
                // create user entry in database
                const userInfo = {
                    name: data.name,
                    email: data.email,
                    image : data.photoURL
                }
                axiosPublic.post('/users', userInfo)
                .then(res => {
                    if(res.data.insertedId){
                        console.log('User added to database')
                        toast.success('User created successfully')
                    }
                })
                reset()
                navigate('/')
            })
            .catch(error => {
                console.log(error)
            })
        })
    }

    return (
        <>
        <Helmet>
            <title>Bistro Boss | Sign Up</title>
        </Helmet>
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center md-w-1/2">
                    <h1 className="text-5xl font-bold">Sign up now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" {...register("name", { required: true })} name='name' placeholder="Name" className="input input-bordered"  />
                            {errors.name && <span className='text-red-400'>Name is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" {...register("photoURL", { required: true })} name='photoURL' placeholder="photoURL" className="input input-bordered"  />
                            {errors.name && <span className='text-red-400'>PhotoURL is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register("email" , { required: true })} name='email' placeholder="Email" className="input input-bordered"  />
                            {errors.email && <span className='text-red-400'>Email is required</span>}

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" {...register("password" , { 
                                required: true, 
                                pattern: /(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])/,
                                minLength:6, 
                                maxLength: 20 })} name='password' placeholder="Password" className="input input-bordered"  />

                            {errors.password?.type === "required" && (
                                <p className='text-red-500'>Password is required</p>
                            )}
                            {errors.password?.type === "pattern" && (
                                <p className='text-red-500'>Password must be have 1 Number 1 Upper case and 1 Lower Case </p>
                            )}
                            {errors.password?.type === "minLength" && (
                                <p className='text-red-500'>Password must be 6 charecter</p>
                            )}
                            {errors.password?.type === "maxLength" && (
                                <p className='text-red-500'>Password must under 20 charecter</p>
                            )}

                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Sign up" />
                        </div>
                    </form>
                    <p className='text-center my-5'><small>Already Have An Account? <Link className='text-green-500' to={'/login'}>Login</Link></small></p>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
        </>
    );
};

export default SignUp;