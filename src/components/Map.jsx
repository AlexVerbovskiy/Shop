import React, { useState, useEffect } from "react";
import MyMarker from "./MyMarker";
import { GoogleMap, useJsApiLoader, InfoWindow } from '@react-google-maps/api';

const Map=({
  setMarkerLatLng,
  coords,
  height = "70vh",
  center = { lat: 44.076613, lng: -98.362239833 },
  staticMarker = null,
  dynamicMarkerName = "Your place"
})=> {

  const [actualMark, setActualMark] = useState(null);
  const [map, setMap] = useState(null)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: ""
  })

  const onLoad = function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    //map.fitBounds(bounds);
    setMap(map)
  }

  const onUnmount = function callback(map) {
    setMap(null)
  }

  const handleMapClick = e => {
    setMarkerLatLng(e.latLng.toJSON());
  };

  useEffect(
    () => {
      if (coords) {
        setActualMark({
          id: dynamicMarkerName,
          pos: coords
        });
      }
    },
    [coords]
  );

  return isLoaded ? (
      <GoogleMap
        center={coords??center}
        zoom={4}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
        mapContainerStyle={{
          height,
          width: "100%"
        }}
      >
        {actualMark &&
          <MyMarker
            actualMark={actualMark}
            isDynamic={true}
          />}
        {staticMarker&&<MyMarker
            actualMark={staticMarker}
          />}
      </GoogleMap>
  ) : <></>
}

export default Map;
