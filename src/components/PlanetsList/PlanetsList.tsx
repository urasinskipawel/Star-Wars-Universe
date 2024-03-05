import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import uuid from 'react-uuid';
import { Link } from 'react-router-dom';
import { endpoints } from '../../constants/constants';
import { ApiResponse, Planet } from '../../interfaces/interfaces';

export const PlanetsList = () => {
	const [planets, setPlanets] = useState<Planet[] | null>([]);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [err, setErr] = useState<string>('');
	const [lastPage, setLastPage] = useState<string | null>('');
	const [firstPage, setFirstPage] = useState<string | null>('');

	const fetchPlanetsData = async (): Promise<void> => {
		const pageUrl = `${endpoints.planetsUrl}?page=${page}`;
		setIsLoading(true);

		try {
			const res: AxiosResponse<ApiResponse> = await axios.get(pageUrl);
			const data = res.data;

			setLastPage(data.next);
			setFirstPage(data.previous);
			setPlanets(data.results as Planet[]);
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
		void fetchPlanetsData();
	}, [page]);

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
								</tr>
							</thead>
							<tbody>
								{planets?.map((planet: Planet) => {
									const url = planet.url;
									const parts = url.split('/');
									const planetNumber = parts[parts.length - 2];
									return (
										<tr key={uuid()}>
											<td>
												<Link to={`planets/${planetNumber}`}>{planet.name}</Link>
											</td>
											<td>{planet.diameter}</td>
											<td>{planet.climate}</td>
											<td>{planet.terrain}</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					)}
					<section>
						<button disabled={!firstPage || isLoading} onClick={() => handlePage(1)}>
							first
						</button>
						<button disabled={!firstPage || isLoading} onClick={() => handlePage(page - 1)}>
							previous
						</button>
						<button disabled={!lastPage || isLoading} onClick={() => handlePage(page + 1)}>
							next
						</button>
						<div>Current page : {page}</div>
					</section>
				</div>
			)}
		</>
	);
};
