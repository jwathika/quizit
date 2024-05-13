import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Components/layout';

import Quiz from './Components/Quiz/Quiz';
import AddQuestion from './Components/Quiz/AddQuestion';
import axios from 'axios';
import ViewQuestions from './Components/Quiz/ViewQuestions';

const App = () => {
	const [categories, setCategories] = useState([]);


	useEffect(() => {
		axios.get("https://opentdb.com/api_category.php")
			.then((res) => {
				const categoriesArray = Object.values(res.data.trivia_categories);
				setCategories(categoriesArray);
			})
			.catch((error) => {
				console.error('Error fetching categories:', error);
			});
	}, []);
	return (
		<Routes >
			<Route element={<Layout />}>
				<Route path="/" element={<Quiz categories={categories} />}></Route>
				<Route path="/add-question" element={<AddQuestion categories={categories} />}></Route>
				<Route path="/view-question" element={<ViewQuestions />}></Route>
			</Route>
		</Routes>
	);
};

export default App;
