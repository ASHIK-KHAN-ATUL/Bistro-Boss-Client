import pic1 from "../../../assets/home/chef-service.jpg";
import './CheifSection.css'

const Cheifsection = () => {
  return (
    <div className="bg-fixed cheifsection  my-10">
        {/* <img className="absolute inset-0 w-full h-full object-cover" src={pic1} alt="" /> */}
      <div className="flex justify-center items-center ">
        <div className="bg-red-100 rounded-xl py-4 md:py-10 px-10 md:px-20  text-center   w-[85%] md:w-2/3  mx-auto my-10">
            <p className="text-5xl font-semibold mb-5">Bistro Boss</p>
            <p className=" lg:px-10 font-medium text-3xl">
            Welcome to Bistro Boss Where Taste Meets Elegance! Discover the
            perfect blend of flavors, ambiance, and culinary artistry. At Bistro
            Boss, every dish is a masterpiece, crafted to delight your senses.
            </p>
        </div>
      </div>
    </div>
  );
};

export default Cheifsection;
