import Swal from "sweetalert2";
import UseCart from "../../../Hooks/UseCart";
import { FaTrashAlt } from "react-icons/fa";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, refetch] = UseCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const axiosSecure = UseAxiosSecure();

  const handdleDelete = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        
        axiosSecure.delete(`/carts/${id}`)
        .then(res => {
          console.log(res)
          if(res.data.deletedCount > 0){
            refetch();
            Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
        });
          }
        })

      }
    });
  }

  return (
    <div>
      <div className="flex justify-around items-center text-sm ">
        <div className="flex flex-col md:flex-row justify-around w-full">
          <h2 className="lg:text-3xl">Items : {cart.length}</h2>
          <h2 className="lg:text-3xl">Total Price : {totalPrice}</h2>
        </div>
        {
          cart.length ? 

          <Link to='/dashboard/payment' >
            <button  className="btn btn-primary text-sm">Pay</button>
          </Link>
           :
           <button disabled className="btn btn-primary text-sm">Pay</button>
        }
      </div>

      <div className="overflow-x-auto w-full ">
        <table className="table">
          {/* head */}
          <thead className="lg:text-lg">
            <tr>
              <th>
                #
              </th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

            {
                cart.map((item , idx)=>  <tr key={item._id} className="lg:text-lg font-semibold">
                    <th>
                      <p>{idx + 1}</p>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={item.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                        {item.name}
                    </td>
                    <td>{item.price}</td>
                    <th>
                      <button onClick={() => handdleDelete(item._id)} className="btn btn-ghost text-red-500 btn-sm md:btn-lg"><FaTrashAlt /></button>
                    </th>
                  </tr> )
            }

          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Cart;
