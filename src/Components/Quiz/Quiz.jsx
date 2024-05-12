import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Filtered from './Filtered';
const Quiz = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/trivia_categories")
            .then((res) => {
                setCategories(res.data);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    return (
        <>
            <h1>Select Category here: </h1>
            <div className="container mx-auto p-4">
                <Filtered categories={categories} />
            </div>
        </>
    );
};

export default Quiz;
