import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const AddFood = () => {
    const [startDate, setStartDate] = useState(new Date());
    const { user } = useContext(AuthContext);
    const [selectedDate, setSelectedDate] = useState(null);
    const { darkMode } = useContext(AuthContext)

    const handleAddJob = async (e) => {
        e.preventDefault();
        const form = e.target;

        const newFood = {
            name: form.name.value,
            category: form.category.value,
            quantity: parseInt(form.quantity.value),
            price: parseFloat(form.price.value),
            description: form.description.value,
            buyerName: user?.displayName,
            buyerEmail: user?.email,
            buyingDate: startDate.toLocaleDateString("en-GB"),
            foodImage: form.foodImage.value,
            foodOrigin: form.foodOrigin.value,
            purchaseCount: parseInt(form.purchaseCount.value),
            addedBy: user?.displayName,
            addedByEmail: user?.email
        };

        try {
            const res = await axios.post('https://assignment-11-server-resturent.vercel.app/resturent', newFood);
            if (res.data.insertedId || res.data.acknowledged) {
                Swal.fire('Success', 'Food item added!', 'success');
                form.reset();
                setStartDate(new Date()); // reset date picker too
            } else {
                Swal.fire('Failed', 'Something went wrong', 'error');
            }
        } catch (err) {
            Swal.fire('Error', err.message || 'Something broke!', 'error');
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <Helmet>
                <title>Management Resturent || addFood</title>
            </Helmet>
            <h2 className={`${darkMode ? "text-gray-300" : "text-black"} text-lg`}>Add New Food Item</h2>
            <form onSubmit={handleAddJob} className="grid gap-4">
                <input type="text" name='name' className="input w-full" placeholder="Food Name" required />
                <input type="text" name='category' className="input w-full" placeholder="Category" required />
                <input type="number" name='quantity' className="input w-full" placeholder="Quantity" required />
                <input type="number" name='price' className="input w-full" placeholder="Price" required />
                <input type="text" name='foodImage' className="input w-full" placeholder="Image URL" required />
                <input type="text" name='foodOrigin' className="input w-full" placeholder="Origin (e.g. Italy)" />
                <input type="text" name='description' className="input w-full" placeholder="Short Description" />
                <input type="number" name='purchaseCount' className="input w-full" placeholder="Purchase Count" />
                <input type="text" name='buyerName' className="input w-full" value={user?.displayName || ''} readOnly />
                <input type="email" name='buyerEmail' className="input w-full" value={user?.email || ''} readOnly />


                <div className='grid '>
                    <label className={`${darkMode ? "text-gray-300" : "text-black"} text-lg`}>buyingDate</label>
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


                <input type="submit" className="btn btn-primary mt-3" value="Add Food" />

            </form>
        </div>
    );
};

export default AddFood;
