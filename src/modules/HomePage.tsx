import React from 'react';
import DishList from '../components/DishList';
import DishSuggester from '../components/DishSuggester';

const HomePage: React.FC = () => {
    return (
        <div>
            <h1 className='flex justify-center bg-orange-100 text-4xl text-rose-700 font-bold mb-6 p-4'>Indian Cuisine</h1>
            <DishSuggester />
            <DishList />
        </div>
    );
};

export default HomePage;
