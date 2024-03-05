import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import uuid from 'react-uuid';

interface Planet {
	name: string;
	rotation_period: string;
	orbital_period: string;
	diameter: string;
	climate: string;
	gravity: string;
	terrain: string;
	surface_water: string;
	population: string;
	residents: string[];
	films: string[];
	created: string;
	edited: string;
	url: string;
}
interface PlanetsResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: Planet[];
}

export const PlanetsList = () => {
	const [planets, setPlanets] = useState<Planet[] | null>([]);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [err, setErr] = useState<string>('');
	const [lastPage, setLastPage] = useState<string | null>('');
	const [firstPage, setFirstPage] = useState<string | null>('');

	const URL = 'https://swapi.dev/api/planets';
	const pageUrl = `${URL}?page=${page}`;

	const fetchData = async (): Promise<void> => {
		setIsLoading(true);

		try {
			const res: AxiosResponse<PlanetsResponse> = await axios.get(pageUrl);
			const data = res.data;

			setLastPage(data.next);
			setFirstPage(data.previous);
			setPlanets(data.results);
		} catch (err) {
			setErr(err as string);
		} finally {
			setIsLoading(false);
		}
	};

	const handlePage = (currPage: number) => {
		setPage(currPage);
	};

	useEffect(() => {
		void fetchData();
	}, [page]);

	return (
		<div>
			{isLoading && <div>Ładowanie danych...</div>}
			{err ? (
				<div>Ups... Something goes wrong</div>
			) : (
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Diameter</th>
							<th>Climate</th>
							<th>Terrain</th>
						</tr>
					</thead>
					<tbody>
						{planets?.map((planet: Planet) => (
							<tr key={uuid()}>
								<td>{planet.name}</td>
								<td>{planet.diameter}</td>
								<td>{planet.climate}</td>
								<td>{planet.terrain}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}

			<section>
				<button disabled={firstPage === null} onClick={() => handlePage(1)}>
					first
				</button>
				<button disabled={firstPage === null} onClick={() => handlePage(page - 1)}>
					previous
				</button>
				<button disabled={lastPage === null} onClick={() => handlePage(page + 1)}>
					next
				</button>
				<div>Current page : {page}</div>
			</section>
		</div>
	);
};
