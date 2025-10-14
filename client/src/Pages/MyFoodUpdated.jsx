import React, { use, useContext, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';
import axios from 'axios';

const MyFoodUpdated = () => {

    const { name, price, foodImage, quantity, category, foodOrigin, description, purchaseCount, buyerName, _id } = useLoaderData();
    const { user } = use(AuthContext);
    const [selectedDate, setSelectedDate] = useState(null);
    const { darkMode } = useContext(AuthContext);

    const handleUpdatedResturent = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const updatedFood = Object.fromEntries(formData.entries());
        axios.patch(`https://assignment-11-server-resturent.vercel.app/resturent/${_id}`, updatedFood, { withCredentials: true })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your data has been Updated",
                        showConfirmButton: false,
                        timer: 1500
                    });

                }
            });
    }

    return (
        <div className="max-w-3xl mx-auto p-4">

            <h2 className={`${darkMode ? "text-gray-300" : "text-black"} text-3xl font-semibold text-center`}>Update Food Item</h2>
            <form onSubmit={handleUpdatedResturent} className="grid mt-5 gap-4">
                <input type="text" name='name' defaultValue={name} className="input w-full" placeholder="Food Name" required />
                <input type="text" name='category' defaultValue={category} className="input w-full" placeholder="Category" required />
                <input type="number" name='quantity' defaultValue={quantity} className="input w-full" placeholder="Quantity" required />
                <input type="number" name='price' defaultValue={price} className="input w-full" placeholder="Price" required />
                <input type="text" name='foodImage' defaultValue={foodImage} className="input w-full" placeholder="Image URL" required />
                <input type="text" name='foodOrigin' defaultValue={foodOrigin} className="input w-full" placeholder="Origin (e.g. Italy)" />
                <input type="text" name='description' defaultValue={description} className="input w-full" placeholder="Short Description" />
                <input type="number" name='purchaseCount' defaultValue={purchaseCount} className="input w-full" placeholder="Purchase Count" />
                <input type="text" name='buyerName' defaultValue={buyerName} className="input w-full" value={user?.displayName || ''} readOnly />
                <input type="email" name='buyerEmail' className="input w-full" value={user?.email || ''} readOnly />

                <div className='grid '>
                    <label className={`${darkMode ? "text-gray-300" : "text-black"} `}>buyingDate</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="yyyy-MM-dd"
                        name='buyingDate'
                        placeholderText="Select buyingDate"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <input type="submit" className="btn btn-primary mt-3" value="Updated Food" />

            </form>
        </div>
    );
};

export default MyFoodUpdated;
