"use client";
import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import nationalParks from "../data/nationalparks";
import PushPinIcon from "@mui/icons-material/PushPin";
import styled from "styled-components";
import "mapbox-gl/dist/mapbox-gl.css";

const Wrapper = styled.div`
	width: "100vw";
	height: "100vh";
`;

const Home = () => {
	const [viewport, setViewport] = useState({
		latitude: 0.0236,
		longitude: 37.9062,
		zoom: 6,
		maxZoom: 12,
	});
	const [selectedPark, setSelectedPark] = useState(null);
	const token = process.env.MAPBOX_TOKEN;

	console.log({ selectedPark });

	return (
		<Wrapper>
			<ReactMapGL
				{...viewport}
				mapboxAccessToken={token}
				// mapStyle="mapbox://styles/mapbox/streets-v9"
				mapStyle="mapbox://styles/dmwangi/clpvacjqr01ig01po9yuf8h1h"
				style={{
					width: "100vw",
					height: "100vh",
				}}
				attributionControl={false}
				// onViewportChange={(viewport) => setViewport(viewport)}
			>
				{nationalParks.features.map((park: any) => {
					return (
						<Marker
							key={park.properties.description}
							latitude={park.geometry.coordinates[1]}
							longitude={park.geometry.coordinates[0]}
							onClick={() => setSelectedPark(park.properties)}
							style={{
								cursor: "pointer",
							}}
						>
							<PushPinIcon fontSize="small" />
						</Marker>
					);
				})}
			</ReactMapGL>
		</Wrapper>
	);
};

export default Home;
