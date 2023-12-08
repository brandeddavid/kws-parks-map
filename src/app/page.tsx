"use client";
import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import nationalParks from "../data/nationalparks";
import PushPinIcon from "@mui/icons-material/PushPin";

const Home = () => {
	const [viewport, setViewport] = useState({
		latitude: -1.282,
		longitude: 36.829,
		zoom: 6,
	});
	const token = process.env.MAPBOX_TOKEN;

	return (
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
				// console.log({ park });
				return (
					<Marker
						key={park.properties.description}
						latitude={park.geometry.coordinates[1]}
						longitude={park.geometry.coordinates[0]}
						onClick={(event) => console.log("Event", event.target)}
						style={{}}
					>
						<div className="text-red z-50">Marker</div>
					</Marker>
				);
			})}
		</ReactMapGL>
	);
};

export default Home;
