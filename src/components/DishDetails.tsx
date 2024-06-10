import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDishByName } from '../services/dishService';
import { Dish, geoData } from '../types/dishes';
import { useLocation } from 'react-router-dom';

const DishDetails: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const [dish, setDish] = useState<Dish | null>(null);
    const [geoData, setGeoData] = useState<geoData | null>(null)
    const navigate = useNavigate();
    const location = useLocation();

    const getLocation = new Promise<{ latitude: number; longitude: number }>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                resolve({ latitude, longitude });
            },
            error => {
                reject(error);
            }
        );
    });

    useEffect(() => {
        if (name !== undefined) {
            getLocation.then(locate => {
                const currentLocation: number[] = [locate.latitude, locate.longitude]
                const requestData: geoData = { location: currentLocation, stateName: location.state || 'tamil nadu' }
                getDishByName(name, requestData).then(response => {
                    setDish(response.data.dish);
                    setGeoData(response.data.statesData);
                });
            })
        }
    }, [name]);




    return (
        <div className="container mx-auto p-4">
            {dish ? (
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-center text-3xl font-bold mb-4">{dish.name}</h1>
                    <div className="space-y-2">
                        <p className="text-lg"><span className="font-semibold">Ingredients:</span> {dish.ingredients}</p>
                        <p className="text-lg"><span className="font-semibold">Diet:</span> {dish.diet}</p>
                        <p className="text-lg"><span className="font-semibold">Prep Time:</span> {dish.prep_time}</p>
                        <p className="text-lg"><span className="font-semibold">Cook Time:</span> {dish.cook_time}</p>
                        <p className="text-lg"><span className="font-semibold">Flavor Profile:</span> {dish.flavor_profile}</p>
                        <p className="text-lg"><span className="font-semibold">Course:</span> {dish.course}</p>
                        <p className="text-lg"><span className="font-semibold">State:</span> {dish.state}</p>
                        <p className="text-lg"><span className="font-semibold">Region:</span> {dish.region}</p>
                        <p className="text-lg"><span className="font-semibold">Centroid:</span> {`${geoData.centroid[0]},  ${geoData.centroid[1]}`}</p>
                        <p className="text-lg"><span className="font-semibold">Distance:</span> {`${geoData.distance} KM`}</p>


                    </div>
                    <button
                        onClick={() => navigate(-1)}
                        className="m-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        Back
                    </button>
                </div>
            ) : (
                <p className="text-center text-lg">Loading...</p>
            )}
        </div>
    );
};

export default DishDetails;
