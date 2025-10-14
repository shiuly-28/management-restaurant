import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
import axios from 'axios';

const FoodPurchase = () => {
    const purchesFood = useLoaderData();
    const { user } = useContext(AuthContext);
    const { darkMode } = useContext(AuthContext);
    console.log(purchesFood);
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;

        const newFood = {
            name: form.name.value,
            category: form.category.value,
            price: parseFloat(form.price.value),
            description: form.description.value,
            organizerEmail: form.organizerEmail.value,
            displayName: form.displayName.value,
            email: form.email.value,
            foodImage: purchesFood.foodImage

        };
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
        });

        // console.log(newFood);
        axios.post('https://assignment-11-server-resturent.vercel.app/orders', newFood)
            .then(result => {
                console.log(result.data);
            })
            .catch(error => console.log(error))
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-4 mt-10 bg-white p-6 rounded-lg shadow">
                <h2 className={`${darkMode ? "text-black" : "text-black"} text-lg`}>Resturent Management</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="name" readOnly value={purchesFood.name} className="input input-bordered" />
                    <input name="category" readOnly value={purchesFood.category} className="input input-bordered" />
                    <input
                        name="quantity"
                        type='text'
                        defaultValue={purchesFood.quantity || 12}
                        className="input input-bordered"
                    />
                    <input name="price" readOnly value={purchesFood.price} className="input input-bordered" />
                    <input name="description" value={purchesFood.description} className="input input-bordered" />
                    <input
                        name="organizerEmail"
                        readOnly
                        value={purchesFood.organizerEmail || "N/A"}
                        className="input input-bordered"
                    />
                    <input name="displayName" readOnly value={user?.displayName} className="input input-bordered" />
                    <input name="email" readOnly value={user?.email} className="input input-bordered" />
                </div>

                <textarea
                    name="suggestion"
                    placeholder="Any suggestion..."
                    className="textarea textarea-bordered w-full"
                    required
                ></textarea>

                <button type="submit" className="btn btn-primary w-full">Food</button>
            </form>
        </div>
    );
};

export default FoodPurchase;
