import React from 'react';
import { PlanetsList } from '../PlanetsList/PlanetsList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PlanetCard } from '../PlanetCard/PlanetCard';

export const App = () => (
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<PlanetsList />} />
			<Route path='/planets/:id' element={<PlanetCard />} />
		</Routes>
	</BrowserRouter>
);
