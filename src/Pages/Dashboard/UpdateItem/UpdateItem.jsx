import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { useLoaderData } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import UseAxiosPublic from '../../../Hooks/UseAxiosPublic';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { ImSpoonKnife } from 'react-icons/im';
import { toast } from 'react-toastify';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY; 
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
    
    const {name, category, recipe, price, _id} = useLoaderData();
    console.log(category);

    const { register, handleSubmit, reset } = useForm();

    const axiosSecure = UseAxiosSecure();
    const axiosPublic = UseAxiosPublic()

    const onSubmit = async (data) => {
        console.log(data);

        const imageFile = { image : data.image[0]}
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers : {
                'content-type' : 'multipart/form-data'
            }
        });
        if(res.data.success){
            const menuItem = {
                name : data.name,
                category : data.category,
                price : parseFloat(data.price),
                recipe : data.recipe,
                image : res.data.data.display_url
            }
            const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
            console.log(menuRes.data)
            if(menuRes.data.modifiedCount > 0){
                // reset();
                toast.success('Menu Item is updated ')
            }
        }
        console.log('With Image url',res.data)
    }

    return (
        <div>
            <SectionTitle heading="Update Item" subHeading="Refresh Info" ></SectionTitle>

                <div className="bg-orange-100 p-5" >
                    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
            
                        <fieldset className="fieldset ">
                            <legend className="fieldset-legend">Recipe Name*</legend>
                            <input {...register('name', {required: true})} defaultValue={name} type="text" className="input w-full" placeholder="Recipe Name"  />
                        </fieldset>
            
                        <div className="flex  gap-6">
                            {/* category */}
                            <div className="w-full">
                                <label className="label">
                                    <span className="fieldset-legend">Category*</span>
                                </label>
                                <select {...register('category' , {required: true})} defaultValue={category} className="select w-full" >
                                    <option disabled={true}>Select a category</option>
                                    <option value="salad">salad</option>
                                    <option value="pizza">Pizza</option>
                                    <option value="dessert">Dessert</option>
                                    <option value="soup">Soup</option>
                                    <option value="drinks">Drinks</option>
                                </select>
                            </div>
            
                            {/* price */}
                            <fieldset className="fieldset w-full">
                                <legend className="fieldset-legend">Price*</legend>
                                <input {...register('price' , {required: true})} 
                                defaultValue={price} type="number" className="input w-full" placeholder="Price" />
                            </fieldset>
                        </div>
            
                        <fieldset className="fieldset ">
                            <legend className="fieldset-legend">Recipe Details</legend>
                            <textarea {...register('recipe' , {required: true})}  defaultValue={recipe}  className="textarea h-24 w-full" placeholder="Recipe Details"></textarea>
                        </fieldset>     
            
                        <div>
                            <input {...register('image' , {required: true})} type="file" className="file-input" />
                        </div>                  
            
                        <button className="btn w-60 p-5 font-semibold text-lg" >
                            Update Menu Item <ImSpoonKnife></ImSpoonKnife> 
                        </button>
            
                    </form>
                </div>
        </div>
    );
};

export default UpdateItem;