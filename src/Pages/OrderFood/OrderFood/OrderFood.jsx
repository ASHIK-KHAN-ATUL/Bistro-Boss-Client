import React, { useState } from 'react';
import orderCover from '../../../assets/shop/Order.jpg'
import Cover from '../../Shared/Cover/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../Hooks/UseMenu';
import FoodCard from '../../../Components/FoodCard/FoodCard';
import OrderTab from '../OrderTab/OrderTab';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const OrderFood = () => {

    const categories =['salad', 'pizza', 'soup', 'dessert', 'drinks', ]
    const {category} = useParams();
    const initialIndex = categories.indexOf(category)
    // console.log(initialIndex)
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [menu] = useMenu();
    // console.log(category)
    
    const dessert = menu.filter(item => item.category === "dessert" )
    const pizza = menu.filter(item => item.category === "pizza" )
    const salad = menu.filter(item => item.category === "salad" )
    const soup = menu.filter(item => item.category === "soup" )
    const drinks = menu.filter(item => item.category === "drinks" )

    return (
        <div>

            <Helmet>
                <title>Bistro Boss | Order Food</title>
            </Helmet>

            <Cover img={orderCover} title={'OUR SHOP'} description={'Would you like to try a dish?'}></Cover>

            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList className={'text-2xl'}>
                    <Tab >Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Dessert</Tab>
                    <Tab>Drinks</Tab>
                </TabList>
                <TabPanel>
                    <OrderTab items={salad}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={pizza}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={soup}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={dessert}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={drinks}></OrderTab>
                </TabPanel>

            </Tabs>

        </div>
    );
};

export default OrderFood;