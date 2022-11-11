import "../styles/pages/SelectTable.scss";
import { useJwt } from "react-jwt";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Input, Select } from "@mantine/core";
import { IconClipboard, IconMapPin } from "@tabler/icons";
import axios from "axios";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import { SET_LOCATION } from "../store/reducers/Location.reducer";

const center = { lat: 4.650176467537301, lng: -74.08958383984998 };
const libraries = ["places"];

const SelectTable = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const homeLocation = useRef("");
  const [locationResult, setLocationResult] = useState('');

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_API_GOOGLE,
    libraries: libraries,
  });

  const [map, setMap] = useState(null);

  const { decodedToken } = useJwt(localStorage.getItem("token"));
  const token = localStorage.getItem("token");
  const type = [
    { value: "restaurant", label: "Restaurante" },
    { value: "togo", label: "Pedido en puerta" },
    { value: "delivery", label: "Domicilio" },
    { value: "pickup", label: "Recgoer" },
  ];
  const floor = [
    { value: 1, label: "Piso 1" },
    { value: 2, label: "Piso 2" },
  ];
  const [selectType, setSelectType] = useState(null);
  const [selectFloor, setSelectFloor] = useState(1);
  const [tables, setTables] = useState([]);
  const [selectTable, setSelectTable] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTable = async () => {
    try {
      setLoading(true);
      const data = await axios.get(
        process.env.REACT_APP_HEROKU +
          `/table/showType/?type=${selectType}&floor=${selectFloor}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let newTables = [];
      data.data.data.forEach((item) =>
        newTables.push({ value: item.number, label: item.number.toString() })
      );
      setTables(newTables);
      setLoading(false);
    } catch (err) {
      alert(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("table", selectTable);
    const res = await axios.get(
      process.env.REACT_APP_HEROKU + `/table/showNumber/${selectTable}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data.data.order) {
      const orderId = res.data.data.order._id;
      localStorage.setItem("order", orderId);
      if (!locationResult){
        dispatch({type: SET_LOCATION, payload:{}})
      }
      navigate(`/selecttable/resumen/${orderId}`);
    } else {
      if (!locationResult){
        dispatch({type: SET_LOCATION, payload:{}})
      }
      localStorage.setItem("order", "");
      navigate(`/selecttable/resumen`);      
    }
  };

  useEffect(() => {
    if (selectType) {
      fetchTable();
    }
    // eslint-disable-next-line
  }, [selectType, selectFloor]);

  if (decodedToken) {
    if (
      decodedToken.role !== "admin" &&
      decodedToken.role !== "cashier" &&
      decodedToken.role !== "waiter"
    ) {
      return <Navigate to="/pedido" />;
    }
  }

  if (!isLoaded) {
    return (
      <div className="hostform_loader">
        <p>Loading...</p>
      </div>
    );
  }

  async function getLocation() {
    try {
      if (homeLocation === "") {
        return;
      }

      // eslint-disable-next-line
      const geocoder = new google.maps.Geocoder();
      // eslint-disable-next-line
      const bounds = new google.maps.LatLngBounds(center);

      const GeocoderRequest = {
        address: homeLocation.current.value,
        bounds: bounds,
      };

      const { results } = await geocoder.geocode(GeocoderRequest);
      map.setCenter(results[0].geometry.location);
      // eslint-disable-next-line
      new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
      });
      console.log(results);
      setLocationResult({
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng(),
      });
      dispatch({type:SET_LOCATION, payload:{
        coordinates: {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        },
        address: homeLocation.current.value
      }})
    } catch (err) {
      console.log(err);
    }
  }

  const defaultBounds = {
    north: center.lat + 0.5,
    south: center.lat - 0.5,
    east: center.lng + 0.5,
    west: center.lng - 0.5,
  };

  const options = {
    bounds: defaultBounds,
    componentRestrictions: { country: "co" },
    // fields: ["address_components", "geometry", "icon", "name"],
    strictBounds: false,
  };

  // eslint-disable-next-line
  new google.maps.places.Autocomplete(homeLocation.current, options);

  return (
    <div className="selecttable">
      <h2>Seleccion de mesa</h2>
      <form onSubmit={handleSubmit}>
        <div className="usercreate__input">
          <Input.Wrapper label="Tipo de mesa" required>
            <Select
              placeholder="Tipo de mesa"
              icon={<IconClipboard />}
              data={type}
              onChange={setSelectType}
              value={selectType}
              searchable
              nothingFound="No options"
            />
          </Input.Wrapper>
        </div>
        <div className="usercreate__input">
          <Input.Wrapper label="Piso" required>
            <Select
              placeholder="Piso"
              icon={<IconClipboard />}
              data={floor}
              onChange={setSelectFloor}
              value={selectFloor}
              searchable
              nothingFound="No options"
            />
          </Input.Wrapper>
        </div>
        <div className="usercreate__input">
          <Input.Wrapper label="Numero de mesa" required>
            <Select
              placeholder="Numero de mesa"
              icon={<IconClipboard />}
              data={tables.length === 0 ? [] : tables}
              onChange={setSelectTable}
              value={selectTable}
              searchable
              nothingFound="No options"
            />
          </Input.Wrapper>
        </div>
        <button
          type="submit"
          className="selecttable__submit"
          style={{
            padding: 8,
            color: "white",
            backgroundColor: "black",
            borderRadius: 5,
            marginTop: 10,
          }}
        >
          Siguiente
        </button>
        <div className="hostform__mapcontainer" style={{display:selectType==='delivery'?'block':'none'}}>
          <div className="hostform__mapcontainer__control">
            <Input
              ref={homeLocation}
              type="text"
              placeholder="Ingresa tu ubicacion exacta"
              icon={<IconMapPin size={16} />}
            />
            <button type="button" onClick={getLocation}>
              Buscar
            </button>
          </div>
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            onLoad={(map) => setMap(map)}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
            }}
          >
          </GoogleMap>
        </div>
      </form>
    </div>
  );
};

export default SelectTable;
