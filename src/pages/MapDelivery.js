import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import axios from "axios";
import { useJwt } from "react-jwt";

const center = { lat: 4.604166, lng: -74.095501 };
const libraries = ["places"];

const MapDelivery = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_API_GOOGLE,
    libraries: libraries,
  });

  const token = localStorage.getItem("token");
  const params = useParams();
  const status = params.status;

  const [map, setMap] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const onload = (map) => {
    setMap(map);
    map.setCenter(center);

    const svgMarker = {
      path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
      fillColor: "blue",
      fillOpacity: 0.8,
      strokeWeight: 0,
      rotation: 0,
      scale: 2,
      // eslint-disable-next-line
      anchor: new google.maps.Point(15, 30),
    };

    // eslint-disable-next-line
    new google.maps.Marker({
      position: center,
      icon: svgMarker,
      map: map,
    });

    if (orders.length === 0) return;

    // eslint-disable-next-line
    const infoWindow = new google.maps.InfoWindow();

    orders.forEach((item) => {
      // eslint-disable-next-line
      const marker = new google.maps.Marker({
        map: map,
        position: item.location.coordinates,
        title: `Mesa: ${item.table.number} \n /$ ${new Intl.NumberFormat(
          "de-DE"
        ).format(item.total)} `,
        optimized: false,
      });

      marker.addListener("click", () => {
        infoWindow.close();
        infoWindow.setContent(marker.getTitle());
        infoWindow.open(marker.getMap(), marker);
      });
    });
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const day = new Date().getDate();
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      const res = await axios.post(
        process.env.REACT_APP_HEROKU + `/order/orderMap/?status=${status}`,
        { date: `${year},${month},${day}` },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      setOrders(res.data.data);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, []);

  const { decodedToken } = useJwt(localStorage.getItem("token"));

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isLoaded) {
    return (
      <div className="hostform_loader">
        <p>Loading...</p>
      </div>
    );
  }  
  

  if (decodedToken) {
    if (decodedToken.role !== "admin") {
      return <Navigate to="/pedido" />;
    }
  }

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <GoogleMap
        center={center}
        zoom={14}
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
  );
};

export default MapDelivery;
