import React from 'react';
import { styled } from '@mui/material/styles';
import { Alert, Box, Button } from '@mui/material';
import { NavigationLink } from '../NavigationLink/NavigationLink';

const StyledAlertContainer = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'space-around',
	height: '140px',
}));

export const AlertBox = () => (
	<StyledAlertContainer>
		<Alert variant='filled' severity='error'>
			Something went wrong.
		</Alert>
		<Button variant='contained'>
			<NavigationLink href={'/'} text={'Go to main page'} />
		</Button>
	</StyledAlertContainer>
);
