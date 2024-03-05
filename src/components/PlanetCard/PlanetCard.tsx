import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import uuid from 'react-uuid';
import { Link, useParams } from 'react-router-dom';
import { endpoints } from '../../constants/constants';
import { People, Planet } from '../../interfaces/interfaces';

export const PlanetCard = () => {
	const [planet, setPlanet] = useState<Planet | null>(null);
	const [residents, setResidents] = useState<People[] | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [err, setErr] = useState<string>('');

	const { id } = useParams();

	const fetchCurrentPlanetData = async (): Promise<void> => {
		const planetUrl = `${endpoints.planetsUrl}/${id}`;
		setIsLoading(true);

		try {
			const res: AxiosResponse<Planet> = await axios.get(planetUrl);
			const data = res.data;

			setPlanet(data);
		} catch (err) {
			setErr(err as string);
		} finally {
			setIsLoading(false);
		}
	};

	const fetchResidentsData = async (): Promise<void> => {
		setIsLoading(true);

		try {
			const planetResidents = planet?.residents as string[];
			if (planetResidents) {
				const res = await Promise.all(planetResidents.map(url => axios.get(url)));
				const residentsData = res.map(response => response.data as People);
				setResidents(residentsData);
			}
		} catch (err) {
			console.error(err);
			setErr(err as string);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		void fetchCurrentPlanetData();
	}, []);

	useEffect(() => {
		if (planet) {
			void fetchResidentsData();
		}
	}, [planet]);

	return (
		<>
			{err ? (
				<div>Ups... Something goes wrong</div>
			) : (
				<div>
					{isLoading ? (
						<div>Fetching data ...</div>
					) : (
						<table>
							<thead>
								<tr>
									<th>Name</th>
									<th>Diameter</th>
									<th>Climate</th>
									<th>Terrain</th>
									<th>Gravity</th>
									<th>Population</th>
									<th>Orbital Period</th>
								</tr>
							</thead>
							<tbody>
								<tr key={uuid()}>
									<td>{planet?.name}</td>
									<td>{planet?.diameter}</td>
									<td>{planet?.climate}</td>
									<td>{planet?.terrain}</td>
									<td>{planet?.gravity}</td>
									<td>{planet?.population}</td>
									<td>{planet?.orbital_period}</td>
								</tr>
							</tbody>
							<div>
								<h1>Residents</h1>
								<ul>{residents?.map(resident => <li key={uuid()}>{resident.name}</li>)}</ul>
							</div>
						</table>
					)}
					<button>
						<Link to='/'>Back to planets list</Link>
					</button>
				</div>
			)}
		</>
	);
};
