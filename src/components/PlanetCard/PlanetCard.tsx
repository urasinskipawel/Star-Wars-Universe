import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import uuid from 'react-uuid';
import { Link, useParams } from 'react-router-dom';
import { endpoints } from '../../constants/constants';
import { Planet } from '../../interfaces/interfaces';

export const PlanetCard = () => {
	const [planet, setPlanet] = useState<Planet | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [err, setErr] = useState<string>('');

	const { id } = useParams();

	const planetUrl = `${endpoints.planetsUrl}/${id}`;

	const fetchPlanetsData = async (): Promise<void> => {
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

	useEffect(() => {
		void fetchPlanetsData();
	}, []);

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
									<th>Residents</th>
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
									<td>{planet?.residents}</td>
								</tr>
							</tbody>
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
