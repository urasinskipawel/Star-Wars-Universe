import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import uuid from 'react-uuid';
import { Link, useParams } from 'react-router-dom';
import { endpoints } from '../../constants/constants';
import { People, Planet } from '../../interfaces/interfaces';
import { styled } from '@mui/material/styles';
import {
	Alert,
	Box,
	Button,
	CircularProgress,
	Container,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	tableCellClasses,
} from '@mui/material';

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

const StyledLink = styled(Link)(() => ({
	textDecoration: 'none',
	color: 'inherit',
	fontWeight: 'bold',
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
				<StyledBox>
					<Alert variant='filled' severity='error'>
						Something goes wrong.
					</Alert>
					<Button sx={{ mt: '20px' }} variant='contained'>
						<StyledLink to='/'>Back to home page</StyledLink>
					</Button>
				</StyledBox>
			) : (
				<StyledBox>
					<Typography variant='h2' gutterBottom>
						{planet?.name}
					</Typography>
					{isLoading ? (
						<CircularProgress sx={{ mt: '50px' }} size={100} />
					) : (
						<StyledBox>
							<TableContainer sx={{ margin: '20px', minWidth: '70%' }} component={Paper}>
								<Table aria-label='simple table'>
									<TableHead>
										<TableRow>
											<StyledTableCell align='center'>Diameter</StyledTableCell>
											<StyledTableCell align='center'>Climate</StyledTableCell>
											<StyledTableCell align='center'>Terrain</StyledTableCell>
											<StyledTableCell align='center'>Gravity</StyledTableCell>
											<StyledTableCell align='center'>Population</StyledTableCell>
											<StyledTableCell align='center'>Orbital Period</StyledTableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										<TableRow key={uuid()}>
											<StyledTableCell align='center'>{planet?.diameter}</StyledTableCell>
											<StyledTableCell align='center'>{planet?.climate}</StyledTableCell>
											<StyledTableCell align='center'>{planet?.terrain}</StyledTableCell>
											<StyledTableCell align='center'>{planet?.gravity}</StyledTableCell>
											<StyledTableCell align='center'>{planet?.population}</StyledTableCell>
											<StyledTableCell align='center'>{planet?.orbital_period}</StyledTableCell>
										</TableRow>
									</TableBody>
								</Table>
							</TableContainer>
							<Typography variant='h4' gutterBottom>
								Residents:
							</Typography>
							<Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', width: '600px' }}>
								{residents && residents.length > 0 ? (
									residents.map((resident: People) => (
										<Typography sx={{ padding: '2px' }} key={uuid()} variant='h6'>
											{resident.name},
										</Typography>
									))
								) : (
									<Typography>There is no information about residents on this Planet</Typography>
								)}
							</Box>
						</StyledBox>
					)}
					<Button sx={{ mt: '20px' }} variant='contained'>
						<StyledLink to='/'>Back to home page</StyledLink>
					</Button>
				</StyledBox>
			)}
		</Container>
	);
};
