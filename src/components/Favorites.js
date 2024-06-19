import React, { useEffect } from 'react';
import Button from '../re-use/Button';
import axios from 'axios';

const Favorites = ({ favorites, setFavorites, fetchWeather }) => {
    useEffect(() => {
        // Fetch favorites from the JSON server
        axios.get('http://localhost:3001/favorites')
            .then(response => setFavorites(response.data));
    }, [setFavorites]);

    const removeFavorite = (city) => {
        axios.delete(`http://localhost:3001/favorites/${city.id}`)
            .then(() => setFavorites(favorites.filter(fav => fav.id !== city.id)));
    };

    return (
        <div className="favorites">
            <h3>Favorites</h3>
            <ul>
                {favorites.map(city => (
                    <li key={city.id}>
                        <span>{city.name}</span>
                        <Button onClick={() => fetchWeather(city.name)}>View</Button>
                        <Button onClick={() => removeFavorite(city)}>Remove</Button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Favorites;
