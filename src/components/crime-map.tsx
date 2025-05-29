// import Map, {
//   Layer,
//   LayerProps,
//   MapRef,
//   Popup,
//   ScaleControl,
//   Source,
// } from "react-map-gl";
// import { type LngLatBoundsLike } from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import { useRef, useState } from "react";
// import {
//   calculateMinMaxCrimeRank,
//   getCrimeRankForZone,
//   getInterpolations,
// } from "../utils/crime-data";
// import geojsonData from "../../public/data/glasgow_city_data_zones.json";
import { useCrime } from "../hooks/crime";

const CrimeMap = () => {
  useCrime();
  // const [popup, setPopup] = useState<{
  //   longitude: number;
  //   latitude: number;
  //   properties: CrimeData;
  // } | null>(null);

  // const mapRef = useRef<MapRef>(null);

  // const defaultMapBounds: LngLatBoundsLike = [
  //   [-4.43, 55.77],
  //   [-4.05, 55.97],
  // ];

  // const [mapBounds] = useState<LngLatBoundsLike>(defaultMapBounds);

  // if (!data) return;

  // const { min, max } = calculateMinMaxCrimeRank(data);
  // const interpolations = getInterpolations(min, max);

  // const colourLayer: LayerProps = {
  //   id: "data-zones-layer",
  //   type: "fill",
  //   paint: {
  //     "fill-color": [
  //       "interpolate",
  //       ["linear"],
  //       ["coalesce", ["get", "crimeRank"], 0],
  //       ...interpolations,
  //     ],
  //     "fill-opacity": 0.5,
  //     "fill-outline-color": "#000",
  //   },
  // };

  // const updatedGeoJson = {
  //   ...geojsonData,
  //   features: geojsonData.features.map((feature) => ({
  //     ...feature,
  //     properties: {
  //       ...feature.properties,
  //       crimeRank: getCrimeRankForZone(feature.properties.DataZone, data),
  //     },
  //   })),
  // };

  // const handlePopup = (event: any) => {
  //   const map = mapRef.current?.getMap();
  //   if (!map) return;

  //   const features = map.queryRenderedFeatures(event.point, {
  //     layers: ["data-zones-layer"],
  //   });

  //   if (features && features.length) {
  //     const hoveredFeature = features[0];
  //     setPopup({
  //       longitude: event.lngLat.lng,
  //       latitude: event.lngLat.lat,
  //       properties: hoveredFeature.properties,
  //     });
  //   } else {
  //     setPopup(null);
  //   }
  // };

  // const handleClick = (event: any) => {
  //   const map = mapRef.current?.getMap();
  //   if (!map) return;

  //   const features = map.queryRenderedFeatures(event.point, {
  //     layers: ["data-zones-layer"],
  //   });

  //   if (features && features.length) {
  //     const clickedFeature = features[0];
  //     if (clickedFeature.geometry.type === "Polygon") {
  //       const coordinates = clickedFeature.geometry.coordinates[0];

  //       let bounds: [[number, number], [number, number]] = [
  //         [Infinity, Infinity],
  //         [-Infinity, -Infinity],
  //       ];

  //       coordinates.forEach((coord) => {
  //         bounds = [
  //           [
  //             Math.min(bounds[0][0], coord[0]),
  //             Math.min(bounds[0][1], coord[1]),
  //           ],
  //           [
  //             Math.max(bounds[1][0], coord[0]),
  //             Math.max(bounds[1][1], coord[1]),
  //           ],
  //         ];
  //       });

  //       if (mapRef.current) {
  //         mapRef.current.fitBounds(bounds, {
  //           padding: 250,
  //           duration: 1000,
  //         });
  //       }
  //     }
  //   }
  //   handlePopup(event);
  // };

  return (
    // <div className="h-[100dvh]">
    //   <div className="h-full">
    //     <Map
    //       ref={mapRef}
    //       mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_KEY}
    //       initialViewState={{
    //         bounds: mapBounds,
    //         fitBoundsOptions: {
    //           padding: 120,
    //         },
    //       }}
    //       mapStyle={"mapbox://styles/mapbox/dark-v9"}
    //       renderWorldCopies={false}
    //       maxBounds={defaultMapBounds}
    //       onClick={handleClick}
    //     >
    //       <Source type="geojson" data={updatedGeoJson}>
    //         <Layer {...colourLayer} />
    //       </Source>
    //       {popup && (
    //         <Popup
    //           closeOnClick={false}
    //           onClose={() => setPopup(null)}
    //           anchor="top"
    //           longitude={popup.longitude}
    //           latitude={popup.latitude}
    //         >
    //           <div>
    //             <strong>Data Zone:</strong> {popup.properties.DataZone}
    //             <br />
    //             <strong>Name:</strong> {popup.properties.Name.split(" - ")[0]}
    //             <br />
    //             <strong>SIMD Crime Rank:</strong> {popup.properties.crimeRank}
    //             <br />
    //           </div>
    //         </Popup>
    //       )}
    //       <ScaleControl unit="metric" />
    //     </Map>
    //   </div>
    // </div>
    <div></div>
  );
};

export default CrimeMap;
