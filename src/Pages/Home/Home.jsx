import React from 'react';
import Banner from './Banner/Banner';
import Category from './Category/Category';
import Cheifsection from './Cheifsection/Cheifsection';
import PopularMenu from './PopularMenu/PopularMenu';
import Featured from './Featured/Featured';
import Testimonials from './Testimonials/Testimonials';
import CallUs from './CallUs/CallUs';
import CheifRecommends from './CheifRecommends/CheifRecommends';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
             <Helmet>
                 <title>Bistro Boss | Home</title>
             </Helmet>
            <Banner></Banner>
            <Category></Category>
            <Cheifsection></Cheifsection>
            <PopularMenu></PopularMenu>
            <CallUs></CallUs>
            <CheifRecommends></CheifRecommends>
            <Featured></Featured>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;