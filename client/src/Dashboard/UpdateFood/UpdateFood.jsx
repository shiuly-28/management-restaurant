import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

const UpdateFood = () => {
  const navigate = useNavigate();
  const food = useLoaderData();
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const form = e.target;
    const updatedFood = {
      name: form.name.value,
      price: parseFloat(form.price.value),
      category: form.category.value,
      foodImage: form.foodImage.value,
    };

    console.log('Updating food with ID:', food._id);
    console.log('Updated data:', updatedFood);

    try {
      const response = await fetch(`https://assignment-11-server-resturent.vercel.app/resturent/${food._id}`, {
        method: "PATCH", // Try PATCH instead of PUT
        headers: { 
          "Content-Type": "application/json" 
        },
        credentials: 'include',
        body: JSON.stringify(updatedFood),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok && (data.success || data.modifiedCount >= 0)) {
        Swal.fire({
          title: "Success!",
          text: "Food updated successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false
        });
        // Small delay to show success message
        setTimeout(() => {
          navigate("/dashboard/myOrders");
        }, 500);
      } else {
        throw new Error(data.message || 'Update failed');
      }
    } catch (error) {
      console.error('Update error:', error);
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to update food. Please check console for details.",
        icon: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!food) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-base-200 rounded-xl mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Update Food</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Food Name</span>
          </label>
          <input 
            type="text" 
            name="name" 
            defaultValue={food.name} 
            className="input input-bordered w-full" 
            placeholder="Enter food name"
            required 
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Price ($)</span>
          </label>
          <input 
            type="number" 
            step="0.01"
            name="price" 
            defaultValue={food.price} 
            className="input input-bordered w-full" 
            placeholder="Enter price"
            required 
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <input 
            type="text" 
            name="category" 
            defaultValue={food.category} 
            className="input input-bordered w-full" 
            placeholder="Enter category"
            required 
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Food Image URL</span>
          </label>
          <input 
            type="url" 
            name="foodImage" 
            defaultValue={food.foodImage} 
            className="input input-bordered w-full" 
            placeholder="Enter image URL"
            required 
          />
        </div>

        <div className="flex gap-2 pt-4">
          <button 
            type="submit" 
            className={`btn btn-primary flex-1 ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Food'}
          </button>
          <button 
            type="button" 
            onClick={() => navigate("/dashboard/myOrders")}
            className="btn btn-outline"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>

    </div>
  );
};

export default UpdateFood;