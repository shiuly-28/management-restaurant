import React, { Suspense } from 'react';
import Banner from '../Component/Banner';
import TopFoods from './TopFoods';
import Testimonials from './Testimonials';
import PopularCategories from './PopularCategories';
import SalesPromotion from './SalesPromotion';
import Review from './Review';




const Home = () => {

    return (
        <div>

            <Banner></Banner>
            <section>
                <TopFoods></TopFoods>

            </section>
            <section>
                <SalesPromotion></SalesPromotion>
            </section>
            {/* <section>
                <Review></Review>
            </section> */}

            <section className='mt-8'>
                <Testimonials></Testimonials>
            </section>
            <section className='mt-8'>
                <PopularCategories></PopularCategories>
            </section>
        </div>
    );
};

export default Home;