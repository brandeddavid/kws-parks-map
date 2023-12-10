"use client";
import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import nationalParks from "../data/nationalparks";
import PushPinIcon from "@mui/icons-material/PushPin";
import styled from "styled-components";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";

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
	const initialSelectedPark = {
		geometry: { coordinates: [] },
		properties: {},
	};
	const [selectedPark, setSelectedPark] = useState<any>(initialSelectedPark);
	const token = process.env.MAPBOX_TOKEN;

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
							key={park.properties.title}
							latitude={park.geometry.coordinates[0]}
							longitude={park.geometry.coordinates[1]}
							onClick={() => setSelectedPark(park)}
							style={{
								cursor: "pointer",
							}}
						>
							<PushPinIcon
								sx={{
									"z-index": 100,
								}}
								fontSize="small"
							/>
						</Marker>
					);
				})}

				{selectedPark.geometry.coordinates.length > 0 && (
					<Popup
						latitude={selectedPark.geometry.coordinates[0]}
						longitude={selectedPark.geometry.coordinates[1]}
						closeOnClick={false}
						onClose={() => setSelectedPark(initialSelectedPark)}
					>
						<div className="py-[20px]">
							<div className="mb-[10px] font-bold">
								{selectedPark.properties?.title}
							</div>

							{/* <div className="h-[50px] w-full">
								<Image
									src="/images/zebra.JPG"
									alt={selectedPark.properties.title}
									height={50}
									width={200}
								/>
							</div> */}

							<div>{selectedPark.properties.description}</div>
							<div className="flex justify-end underline mt-[5px] cursor-pointer">
								View more
							</div>
						</div>
					</Popup>
				)}
			</ReactMapGL>
		</Wrapper>
	);
};

export default Home;
