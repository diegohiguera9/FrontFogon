import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { useState } from "react";

// const center = { lat: 4.650176467537301, lng: -74.08958383984998 };
const libraries = ["places"];

const ResumeMap = ({location})=>{
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.REACT_APP_API_GOOGLE,
        libraries: libraries,
      });
    
      const [map, setMap] = useState(null);

      const onload = (map)=>{
        setMap(map)
        map.setCenter(center);
        // eslint-disable-next-line
        new google.maps.Marker({
          map: map,
          position: center,
        });
      }

      if (!location){
        return <></>
      }

      const center = location.coordinates

      if (!isLoaded) {
        return (
          <div className="hostform_loader">
            <p>Loading...</p>
          </div>
        );
      }
    return (
        <div style={{height:350, marginTop:20}}>
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            onLoad={(map) => onload(map)}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
            }}
          >
            <Marker position={center} />
          </GoogleMap>
        </div>
    )
}

export default ResumeMap