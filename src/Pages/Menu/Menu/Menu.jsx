
import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import menuImage from '../../../assets/menu/banner3.jpg'
import dessertImage from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImage from '../../../assets/menu/pizza-bg.jpg'
import saladImage from '../../../assets/menu/salad-bg.jpg'
import soupImage from '../../../assets/menu/soup-bg.jpg'
import useMenu from '../../../Hooks/UseMenu';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';



const Menu = () => {

    const [menu] = useMenu();

    const offered = menu.filter(item => item.category === "offered" )
    const dessert = menu.filter(item => item.category === "dessert" )
    const pizza = menu.filter(item => item.category === "pizza" )
    const salad = menu.filter(item => item.category === "salad" )
    const soup = menu.filter(item => item.category === "soup" )

    return (
        <div className='mb-20'>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>

            {/* Page cover pic */}
            <Cover img={menuImage} title={"Our Menu"} description={"Explore our diverse and delicious offerings, crafted to satisfy every craving"}></Cover>

            {/* Today offer */}
            <SectionTitle subHeading={"Don't Miss"} heading={"Today's Offer"}  ></SectionTitle>
            <MenuCategory items={offered} btnText={'ORDER YOUR FAVOURITE FOOD'} ></MenuCategory>

            <MenuCategory items={dessert} btnText={'ORDER YOUR FAVOURITE FOOD'} title={'dessert'} image={dessertImage} description={"Indulge in our heavenly desserts, the perfect sweet ending to your meal."}></MenuCategory>

            <MenuCategory items={pizza} btnText={'ORDER YOUR FAVOURITE FOOD'} title={"pizza"} image={pizzaImage} description={"Enjoy our hand-tossed pizzas, topped with the freshest ingredients."}></MenuCategory>

            <MenuCategory items={salad} btnText={'ORDER YOUR FAVOURITE FOOD'} title={"salad"} image={saladImage} description={"Savor our crisp and refreshing salads, packed with wholesome flavors."}></MenuCategory>

            <MenuCategory items={soup} btnText={'ORDER YOUR FAVOURITE FOOD'} title={"soup"} image={soupImage} description={"Warm up with our comforting soups, made from scratch with love."}></MenuCategory>     
            
        </div>
    );
};

export default Menu;