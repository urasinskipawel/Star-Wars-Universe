import React, { ChangeEvent, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import uuid from 'react-uuid';
import { styled } from '@mui/material/styles';
import { endpoints } from '../../constants/constants';
import { ApiResponse, Planet } from '../../interfaces/interfaces';
import {
	Box,
	CircularProgress,
	Container,
	Pagination,
	TableCell,
	TableRow,
	Typography,
	tableCellClasses,
} from '@mui/material';
import { AlertBox } from '../AlertBox/AlertBox';
import { NavigationLink } from '../NavigationLink/NavigationLink';
import { CustomTable } from '../CustomTable/CustomTable';

const StyledTableCell = styled(TableCell)(() => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: '#1976D2',
		color: '#fff',
		fontWeight: 'bold',
	},
	[`&.${tableCellClasses.body}`]: {
		padding: 8,
	},
}));

const StyledBox = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
}));

export const PlanetsList = () => {
	const [planets, setPlanets] = useState<Planet[] | null>([]);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [err, setErr] = useState<string>('');
	const [totalPages, setTotalPages] = useState(1);

	const fetchPlanetsData = async (): Promise<void> => {
		const pageUrl = `${endpoints.planetsUrl}?page=${page}`;
		setIsLoading(true);

		try {
			const res: AxiosResponse<ApiResponse> = await axios.get(pageUrl);
			const data = res.data;
			const totalPages = Math.ceil(data.count / data.results.length);

			setTotalPages(totalPages);
			setPlanets(data.results as Planet[]);
		} catch (err) {
			setErr(err as string);
		} finally {
			setIsLoading(false);
		}
	};

	const handlePage = (e: ChangeEvent<unknown>, currPage: number) => {
		setPage(currPage);
	};

	useEffect(() => {
		void fetchPlanetsData();
	}, [page]);

	return (
		<Container
			sx={{
				display: 'flex',
				justifyContent: 'center',
			}}>
			{err ? (
				<AlertBox />
			) : (
				<StyledBox>
					<Typography variant='h2' gutterBottom>
						Welcome to Star Wars Universe!
					</Typography>
					<Typography variant='h6' gutterBottom>
						Type the planet name to find out more details!
					</Typography>
					{isLoading ? (
						<CircularProgress sx={{ mt: '50px' }} size={100} />
					) : (
						<StyledBox>
							<CustomTable
								firstChild={
									<>
										<StyledTableCell align='center'>Name</StyledTableCell>
										<StyledTableCell align='center'>Diameter</StyledTableCell>
										<StyledTableCell align='center'>Climate</StyledTableCell>
										<StyledTableCell align='center'>Terrain</StyledTableCell>
									</>
								}
								secondChild={
									<>
										{planets?.map((planet: Planet) => {
											const url = planet.url;
											const parts = url.split('/');
											const planetNumber = parts[parts.length - 2];
											return (
												<TableRow key={uuid()}>
													<StyledTableCell align='center'>
														<NavigationLink href={`planets/${planetNumber}`} text={planet.name} />
													</StyledTableCell>
													<StyledTableCell align='center'>{planet.diameter}</StyledTableCell>
													<StyledTableCell align='center'>{planet.climate}</StyledTableCell>
													<StyledTableCell align='center'>{planet.terrain}</StyledTableCell>
												</TableRow>
											);
										})}
									</>
								}></CustomTable>
							<Pagination color='primary' count={totalPages} page={page} onChange={handlePage} shape='rounded'></Pagination>
						</StyledBox>
					)}
				</StyledBox>
			)}
		</Container>
	);
};
