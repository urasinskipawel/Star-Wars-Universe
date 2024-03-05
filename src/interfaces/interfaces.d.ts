export interface Planet {
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
export interface People {
	birth_year: string;
	created: string;
	edited: string;
	eye_color: string;
	films: string[];
	gender: string;
	hair_color: string;
	height: string;
	homeworld: string;
	mass: string;
	name: string;
	skin_color: string;
	species: string[];
	starships: string[];
	url: string;
	vehicles: string[];
}
export interface ApiResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: Planet[] | People[];
}
