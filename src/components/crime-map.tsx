import Map, {
  Layer,
  LayerProps,
  MapRef,
  ScaleControl,
  Source,
} from "react-map-gl";
import { type LngLatBoundsLike } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useState } from "react";
import { calculateMinMaxCrimeRank, getInterpolations } from "../utils/crime-data";
import geojsonData from "../../public/data/glasgow_city_data_zones.json";
import { useCrime } from "../hooks/crime";

const CrimeMap = () => {
  const { data } = useCrime();

  if (!data) return

  const { min, max } = calculateMinMaxCrimeRank(data);
  const interpolations = getInterpolations(min, max)

  const mapRef = useRef<MapRef>(null);

  const defaultMapBounds: LngLatBoundsLike = [
    [-4.43, 55.77], // Southwest corner of Glasgow
    [-4.05, 55.97], // Move further east
  ];
  

  const [mapBounds] = useState<LngLatBoundsLike>(defaultMapBounds);

  const getCrimeRankForZone = (dataZone: string) => {
    const zoneData = data.find((d) => d.Data_Zone === dataZone);
    return zoneData ? zoneData.SIMD2020_Crime_Domain_Rank : min;
  };

  const colourLayer: LayerProps = {
    id: "data-zones-layer",
    type: "fill",
    paint: {
      "fill-color": [
        "interpolate",
        ["linear"],
        ["coalesce", ["get", "crimeRank"], 0],
        ...interpolations
      ],
      "fill-opacity": 0.5,
      "fill-outline-color": "#000",
    },
  };

  const updatedGeoJson = {
    ...geojsonData,
    features: geojsonData.features.map((feature) => ({
      ...feature,
      properties: {
        ...feature.properties,
        crimeRank: getCrimeRankForZone(feature.properties.DataZone),
      },
    })),
  };
console.log(updatedGeoJson)
  return (
    <div className="h-[100dvh]">
      <div className="h-full">
        <Map
          ref={mapRef}
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_KEY}
          initialViewState={{
            bounds: mapBounds,
            fitBoundsOptions: {
              padding: 120,
            },
          }}
          mapStyle={"mapbox://styles/mapbox/dark-v9"}
          renderWorldCopies={false}
          maxBounds={defaultMapBounds}
        >
          <Source type="geojson" data={updatedGeoJson}>
            <Layer {...colourLayer} />
          </Source>
          <ScaleControl unit="metric" />
        </Map>
      </div>
    </div>
  );
};

export default CrimeMap;
