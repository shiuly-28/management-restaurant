import React from 'react';

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <span className="loading loading-dots loading-xl text-primary"></span>
        </div>
    );
};

export default Loader;