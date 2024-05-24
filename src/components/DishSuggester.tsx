import React, { useState } from 'react';
import { getDishesByIngredients } from '../services/dishService';
import { Dish } from '../types/dishes';

const DishSuggester: React.FC = () => {
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState<Dish[]>([]);

    const handleAddIngredient = () => {
        if (input && !ingredients.includes(input)) {
            setIngredients([...ingredients, input]);
        }
        setInput('');
    };

    const handleSuggest = () => {
        getDishesByIngredients(ingredients).then(response => {
            setSuggestions(response.data);
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-center text-3xl font-bold mb-6">Dish Suggester</h1>
            <div className="flex justify-center mb-4">
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    className="border border-gray-300 p-2 rounded-l-md w-1/2"
                />
                <button
                    onClick={handleAddIngredient}
                    className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-700"
                >
                    Add Ingredient
                </button>
            </div>
            <div className="flex justify-center mb-6">
                <button
                    onClick={handleSuggest}
                    className="bg-green-500 text-white p-2 rounded-md hover:bg-green-700"
                >
                    Suggest Dishes
                </button>
            </div>
            <div className="flex flex-wrap justify-center mb-4">
                {ingredients.map((ingredient, index) => (
                    <span
                        key={index}
                        className="bg-gray-200 text-gray-700 p-2 m-1 rounded-md"
                    >
                        {ingredient}
                    </span>
                ))}
            </div>
            <ul className="list-disc list-inside">
                {suggestions.map((dish, index) => (
                    <li key={index} className="text-lg mb-2">
                        {dish.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DishSuggester;
