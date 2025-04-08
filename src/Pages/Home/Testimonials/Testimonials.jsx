import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { data } from 'autoprefixer';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'


const Testimonials = () => {

    const [reviews, setReviews] = useState([]);

    useEffect( () =>{
        fetch('https://bistro-boss-server-tau-ten.vercel.app/reviews')
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            setReviews(data)
        })
    } ,[])

    // console.log(reviews)

    return (
        <div className='my-20'>
            <SectionTitle
                subHeading={"What Our Clien Say"}
                heading={"Testimonials"}
            ></SectionTitle>

            <Swiper
                pagination={{
                type: 'fraction',
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper" >

                {
                    reviews.map(review =>   
                    <SwiperSlide  key={review._id} >
                        <div className='flex flex-col items-center mx-24 my-16 gap-4'>
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}

                            />
                            <img src={'https://img.icons8.com/?size=100&id=ZrQhxIVeIp4x&format=png&color=000000'} alt="" />
                            <p>{review.details}</p>
                            <h3 className='text-2xl text-orange-400'>{review.name}</h3>
                        </div>
                    </SwiperSlide> )
                }

            </Swiper>
        </div>
    );
};

export default Testimonials;