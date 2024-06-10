import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllDishes } from '../services/dishService';
import { Dish } from '../types/dishes';

const DishList: React.FC = () => {
    const [dishes, setDishes] = useState<Dish[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllDishes().then(response => {
            setDishes(response.data);
        });
    }, []);

    const handleRowClick = (dishName: string, dishState: string) => {
        navigate(`/dish/${dishName}`, {state: dishState});
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-center text-2xl font-black mb-4">Dish List</h1>
            <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Ingredients</th>
                        <th className="py-2 px-4 border-b">Diet</th>
                        <th className="py-2 px-4 border-b">Prep Time</th>
                        <th className="py-2 px-4 border-b">Cook Time</th>
                        <th className="py-2 px-4 border-b">Flavor Profile</th>
                        <th className="py-2 px-4 border-b">Course</th>
                        <th className="py-2 px-4 border-b">State</th>
                        <th className="py-2 px-4 border-b">Region</th>
                    </tr>
                </thead>
                <tbody>
                    {dishes.map((dish, index) => (
                        <tr key={index} className="even:bg-gray-100 odd:bg-white">
                            <td className="py-2 px-4 border-b text-sky-500 underline decoration-1 cursor-pointer" onClick={() => handleRowClick(dish.name, dish.state)}>{dish.name}</td>
                            <td className="py-2 px-4 border-b">{dish.ingredients}</td>
                            <td className="py-2 px-4 border-b">{dish.diet}</td>
                            <td className="py-2 px-4 border-b">{dish.prep_time}</td>
                            <td className="py-2 px-4 border-b">{dish.cook_time}</td>
                            <td className="py-2 px-4 border-b">{dish.flavor_profile}</td>
                            <td className="py-2 px-4 border-b">{dish.course}</td>
                            <td className="py-2 px-4 border-b">{dish.state}</td>
                            <td className="py-2 px-4 border-b">{dish.region}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DishList;
