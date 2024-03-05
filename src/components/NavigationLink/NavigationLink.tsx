import React from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

interface NavigationLinkProps {
	href: string;
	text: string;
}

const StyledLink = styled(Link)(() => ({
	textDecoration: 'none',
	color: 'inherit',
	fontWeight: 'bold',
}));

export const NavigationLink = ({ href, text }: NavigationLinkProps) => <StyledLink to={href}>{text}</StyledLink>;
