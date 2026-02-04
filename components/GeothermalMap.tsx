"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
} from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { GiSmokingVolcano } from "react-icons/gi";
import { PiNuclearPlantBold } from "react-icons/pi";

interface GeothermalPlant {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  capacityMW: number;
  status: string;
  yearOperational?: number;
}

interface Volcano {
  id?: string;
  name: string;
  lat: number;
  lng: number;
  alertLevel: string;
  colorCode: string;
  region: string;
}

export default function GeothermalMap() {
  const [geothermal, setGeothermal] = useState<GeothermalPlant[]>([]);
  const [volcanoes, setVolcanoes] = useState<Volcano[]>([]);

  useEffect(() => {
    fetch("/api/geothermal")
      .then((r) => r.json())
      .then(setGeothermal);
    fetch("/api/volcanoes")
      .then((r) => r.json())
      .then(setVolcanoes);
  }, []);

  const getPlantIconSize = (capacityMW: number, maxCapacity: number): number => {
    return Math.floor(capacityMW / maxCapacity * 48);
  };

  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-xl border border-slate-200 shadow-lg">
      <div className="absolute top-3 right-3 z-1000 flex flex-col gap-2 rounded-lg bg-white/95 p-2 shadow-md backdrop-blur">
        <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
          <PiNuclearPlantBold color="green" />
          Geothermal plants
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
          <span className="text-xs">
            Active < GiSmokingVolcano color="red"/> / Dormant{" "}
            < GiSmokingVolcano color="gray" /> volcanoes
          </span>
        </label>
      </div>
      <MapContainer
        key="geothermal-map"
        center={[20, 0]}
        zoom={2}
        className="h-full w-full"
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geothermal.map((plant) => {
          return (
            <Marker key={plant.id} position={[plant.lat, plant.lng]} icon={L.divIcon({
              html: renderToStaticMarkup(<PiNuclearPlantBold color="green" size={getPlantIconSize(plant.capacityMW, geothermal.reduce((max, plant) => Math.max(max, plant.capacityMW), 0))} />),

            })} >
              <Popup>
                <strong>{plant.name}</strong>
                <br />
                {plant.country} · {plant.capacityMW} MW
              </Popup>
            </Marker>
          );
        })}
       {volcanoes.length > 0 && volcanoes.map((volcano) => {
        return (
          <Marker key={volcano.id ?? volcano.name} position={[volcano.lat, volcano.lng]} icon={L.divIcon({
            html: renderToStaticMarkup(<GiSmokingVolcano color={"red"} size={12} />),
          })} >
          </Marker>
        );
       })}
      </MapContainer>
    </div>
  );
}
