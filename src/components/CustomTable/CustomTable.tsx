import React from 'react';
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';

interface CustomTableProps {
	firstChild: React.ReactNode;
	secondChild: React.ReactNode;
}

export const CustomTable = ({ firstChild, secondChild }: CustomTableProps) => (
	<TableContainer sx={{ margin: '20px' }} component={Paper}>
		<Table sx={{ minWidth: 650 }} aria-label='simple table'>
			<TableHead>
				<TableRow>{firstChild}</TableRow>
			</TableHead>
			<TableBody>{secondChild}</TableBody>
		</Table>
	</TableContainer>
);
