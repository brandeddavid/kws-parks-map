"use client";
import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
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
	});
	const [selectedPark, setSelectedPark] = useState({
		geometry: { coordinates: [] },
		properties: {},
	});
	const token = process.env.MAPBOX_TOKEN;

	console.log({ selectedPark });
	console.log(selectedPark.geometry.coordinates.length);

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
				minZoom={6}
				maxZoom={6}
				// onViewportChange={(viewport) => setViewport(viewport)}
			>
				{nationalParks.features.map((park: any) => {
					return (
						<Marker
							key={park.properties.description}
							latitude={park.geometry.coordinates[1]}
							longitude={park.geometry.coordinates[0]}
							onClick={() => setSelectedPark(park)}
							style={{
								cursor: "pointer",
							}}
						>
							<PushPinIcon fontSize="small" />
						</Marker>
					);
				})}

				{selectedPark.geometry.coordinates.length > 0 && (
					<Popup
						latitude={selectedPark.geometry.coordinates[1]}
						longitude={selectedPark.geometry.coordinates[0]}
						closeOnClick={false}
					>
						<div>Hello</div>
					</Popup>
				)}
			</ReactMapGL>
		</Wrapper>
	);
};

export default Home;
