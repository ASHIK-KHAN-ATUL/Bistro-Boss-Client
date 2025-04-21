import { toast } from "react-toastify";
import UseAuth from "../../Hooks/UseAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import UseCart from "../../Hooks/UseCart";



const FoodCard = ({item}) => {

    const {user} = UseAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const {name, category, image  , price, recipe, _id} = item;
    const axiosSecure = UseAxiosSecure();
    const [ , refetch ] = UseCart();


    const handleAddToCart = () => {

        if(user && user.email){
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price,
            }
            axiosSecure.post('/carts', cartItem)
            .then( res => {
                console.log(res.data)
                if(res.data.insertedId){
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${name} added to your cart`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                      refetch();
                }
            })
        }
        else{
            Swal.fire({
                title: "You Are Not Login",
                text: "Please Login To Add To The Cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login"
              }).then((result) => {
                if (result.isConfirmed) {
                    // send the user login page
                    navigate('/login', {state: {from: location}})
                }
              });
        }
    }

    return (
            <div className="card w-96 mx-auto bg-sky-50 shadow-xl scale-95 hover:scale-90 duration-500 transition-all cursor-pointer">

                <img className="h-[350px] object-cover border-2 border-black mb-5" src={image} alt={name} />
                <p className="bg-black text-white absolute right-0 mr-3 mt-3 p-2 font-medium text-2xl rounded-lg">${price}</p>

                <div className="p-5 flex flex-col gap-4 justify-center items-center">
                    <h2 className="text-3xl text-center font-bold">{name}</h2>
                    <p className='font-medium text-xl'>{recipe}</p>
                    <div className="card-actions justify-end ">
                        <button 
                        onClick={handleAddToCart}
                        className={`btn duration-300 font-bold text-2xl my-5 text-orange-400 border-b-4 bg-white border-orange-400 hover:text-white hover:bg-black hover:border-b-4 hover:border-orange-400 hover:border-black" }`} >Add TO CART</button>
                    </div>
                </div>
            </div>

    );
};

export default FoodCard;