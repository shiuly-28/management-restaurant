import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';

const RootLayOut = () => {
    return (
        <div>
            <header className='w-11/12 mx-auto rounded-2xl mt-5'>
            <Navbar></Navbar>
            </header>
            <main className='w-11/12 mx-auto min-h-screen mt-5 bg-blue-100'>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default RootLayOut;