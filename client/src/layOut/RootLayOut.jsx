import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';

const RootLayOut = () => {
    return (
        <div>
            <header className='rounded-2xl mt-5'>
            <Navbar></Navbar>
            </header>
            <main className=' min-h-screen mt-5 overflow-hidden'>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default RootLayOut;