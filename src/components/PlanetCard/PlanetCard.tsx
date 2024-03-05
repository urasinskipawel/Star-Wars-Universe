import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import uuid from 'react-uuid';
import { useParams } from 'react-router-dom';
import { endpoints } from '../../constants/constants';
import { People, Planet } from '../../interfaces/interfaces';
import { styled } from '@mui/material/styles';
import { Box, Button, CircularProgress, Container, TableCell, Typography, tableCellClasses } from '@mui/material';
import { NavigationLink } from '../NavigationLink/NavigationLink';
import { AlertBox } from '../AlertBox/AlertBox';
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

const ResidentsBox = styled(Box)(() => ({
	display: 'flex',
	justifyContent: 'center',
	flexWrap: 'wrap',
	width: '600px',
	marginBottom: '20px',
}));

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
		<Container
			disableGutters
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			{err ? (
				<AlertBox />
			) : (
				<StyledBox>
					<Typography variant='h2' gutterBottom>
						{planet?.name}
					</Typography>
					{isLoading ? (
						<CircularProgress sx={{ mt: '50px' }} size={100} />
					) : (
						<StyledBox>
							<CustomTable
								firstChild={
									<>
										<StyledTableCell align='center'>Diameter</StyledTableCell>
										<StyledTableCell align='center'>Climate</StyledTableCell>
										<StyledTableCell align='center'>Terrain</StyledTableCell>
										<StyledTableCell align='center'>Gravity</StyledTableCell>
										<StyledTableCell align='center'>Population</StyledTableCell>
										<StyledTableCell align='center'>Orbital Period</StyledTableCell>
									</>
								}
								secondChild={
									<>
										<StyledTableCell align='center'>{planet?.diameter}</StyledTableCell>
										<StyledTableCell align='center'>{planet?.climate}</StyledTableCell>
										<StyledTableCell align='center'>{planet?.terrain}</StyledTableCell>
										<StyledTableCell align='center'>{planet?.gravity}</StyledTableCell>
										<StyledTableCell align='center'>{planet?.population}</StyledTableCell>
										<StyledTableCell align='center'>{planet?.orbital_period}</StyledTableCell>
									</>
								}></CustomTable>
							<Typography variant='h4' gutterBottom>
								Residents:
							</Typography>
							<ResidentsBox>
								{residents && residents.length > 0 ? (
									residents.map((resident: People) => (
										<Typography sx={{ padding: '2px' }} key={uuid()} variant='h6'>
											{resident.name},
										</Typography>
									))
								) : (
									<Typography>There is no information about residents on this Planet</Typography>
								)}
							</ResidentsBox>
						</StyledBox>
					)}
					<Button variant='contained'>
						<NavigationLink href={'/'} text={'Go to main page'} />
					</Button>
				</StyledBox>
			)}
		</Container>
	);
};
