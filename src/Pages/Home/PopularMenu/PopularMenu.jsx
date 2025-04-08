import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import useMenu from '../../../Hooks/UseMenu';

const PopularMenu = () => {

    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === "popular")


    return (
        <section className='my-10'>
            <SectionTitle
                heading={'From Our Menu'}
                subHeading={"Popular Items"}
            ></SectionTitle>
            <div className='grid lg:grid-cols-2 gap-7 '>
                {
                    popular.map(item => <MenuItem 
                        item={item}
                        key={item._id} ></MenuItem> )
                }
            </div>
            <div className='flex justify-center items-center mt-4 ' >
                <button className='btn btn-outline border-0 border-b-4 hover:border-b-4  hover:border-white duration-500 text-lg font-bold mt-4'>View Full Menu</button>
            </div>
        </section>
    );
};

export default PopularMenu;