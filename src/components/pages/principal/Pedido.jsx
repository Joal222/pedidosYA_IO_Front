import React, { useState, useEffect, useRef } from "react";
import { Card, Col, Row } from "antd";
import { Input } from '@nextui-org/react';
import { useLocation } from "react-router-dom";
import NavBar from "../../navbar/NavBar";
import { GoogleMap, Marker, useLoadScript, StandaloneSearchBox } from "@react-google-maps/api";

const { Meta } = Card;

const libraries = ["places"]; // Necesitamos cargar la biblioteca de "places"

const Pedido = () => {
  const location = useLocation();
  const carrito = location.state?.carrito || [];

  const [latitud, setLatitud] = useState(14.703523868582117);
  const [longitud, setLongitud] = useState(-90.58251820061204);
  const [direccion, setDireccion] = useState("");
  const [nombre, setNombre] = useState("");

  const searchBoxRef = useRef(null); 
  const mapRef = useRef(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDovc6Tg3yNya8AFWbvOILz11d0P12o77M", 
    libraries: libraries, 
  });

  // Usar la API de Geolocalización del navegador
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLatitud(lat);
        setLongitud(lng);
        obtenerDireccion(lat, lng);
      });
    } else {
      alert("La geolocalización no es soportada por este navegador.");
    }
  }, []);

  // Función para obtener la dirección a partir de la latitud y longitud
  const obtenerDireccion = async (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    const latlng = { lat, lng };
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          const filteredResult = results.find(result => 
            result.types.includes("street_address") || 
            result.types.includes("route") || 
            result.types.includes("sublocality") ||
            result.types.includes("locality")
          );
          
          const direccion = filteredResult ? filteredResult.formatted_address : results[0].formatted_address;
          setDireccion(direccion);
          console.log("Dirección obtenida:", direccion);
        } else {
          console.log("No se encontraron resultados.");
        }
      } else {
        console.log("Fallo en la geocodificación inversa debido a:", status);
      }
    });
  };

  // Función para manejar el lugar seleccionado desde el SearchBox
  const onPlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      if (place.geometry) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setLatitud(lat);
        setLongitud(lng);
        setDireccion(place.formatted_address);
        console.log("Lugar seleccionado:", place.formatted_address);
      }
    }
  };

  // Renderizar el mapa si está cargado
  const renderMap = () => {
    if (!isLoaded || !latitud || !longitud) return <div>Cargando mapa...</div>;

    return (
      <GoogleMap
        ref={mapRef}
        mapContainerStyle={{ width: "100%", height: "800px" }}
        center={{ lat: latitud, lng: longitud }}
        zoom={15}
      >
        {/* Usamos el marcador tradicional */}
        <Marker 
  key={`${latitud}-${longitud}`} 
  position={{ lat: latitud, lng: longitud }} 
  draggable={true} // Hacer que el marcador sea arrastrable
  onDragEnd={(e) => {
    const newLat = e.latLng.lat();
    const newLng = e.latLng.lng();
    setLatitud(newLat);
    setLongitud(newLng);
    obtenerDireccion(newLat, newLng); // Actualizar la dirección basada en la nueva ubicación
  }}
/>

        {/* SearchBox sobre el mapa */}
        <StandaloneSearchBox
          onLoad={(ref) => searchBoxRef.current = ref}
          onPlacesChanged={onPlacesChanged}
        >
          <input
            type="text"
            placeholder="Buscar en el mapa"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              marginTop: `10px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "50%",
              top: "10px",
              transform: "translateX(-50%)"
            }}
          />
        </StandaloneSearchBox>
      </GoogleMap>
    );
  };

  return (
    <div className="px-5 w-full h-max">
      <div className="flex flex-col w-full h-1/5">
        <NavBar />
      </div>
      <div className="flex justify-center w-full h-full">
        <div className="h-full flex flex-col justify-between w-2/4">
          <br />
          <h1 className="text-center font-bold text-[18px]">Detalles del Pedido</h1>
          <div className="flex flex-col w-full">
            <div className="flex justify-around w-full">
              <Input
                className="m-2 w-2/4"
                isRequired
                label="Nombre"
                placeholder="Nombre"
                name="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <Input
                className="m-2 w-2/4"
                isRequired
                label="Dirección"
                placeholder="Dirección"
                name="direccion"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)} 
              />
            </div>
            <div className="flex justify-around w-full">
              <Input
                className="m-2 w-2/4"
                isRequired
                label="Latitud"
                placeholder="Latitud"
                name="latitud"
                readOnly
                value={latitud || ''}
              />
              <Input
                className="m-2 w-2/4"
                isRequired
                label="Longitud"
                placeholder="Longitud"
                name="longitud"
                readOnly
                value={longitud || ''}
              />
            </div>
          </div>
          <br />
          <h1 className="text-center font-bold text-[18px]">Listado Pedidos</h1>
          <br />
          <div className="">
            <Row gutter={[16, 16]} justify="center">
              {carrito.map((producto) => (
                <Col xs={24} sm={12} md={8} lg={5} key={producto.id}>
                  <Card
                    hoverable
                    style={{ width: "100%", height: "auto" }}
                    cover={
                      <img
                        alt={producto.nombreProducto}
                        src={producto.url}
                        style={{ objectFit: "cover", height: 200 }}
                      />
                    }
                  >
                    <Meta
                      title={producto.nombreProducto}
                      description={`Cantidad: ${producto.cantidad} - Precio: Q.${producto.precio}`}
                    />
                    <br />
                    <h3>Subtotal: Q.{producto.precio * producto.cantidad}</h3>
                  </Card>
                  <br />
                </Col>
              ))}
            </Row>
            <h2 className="font-bold text-[16px]">
              Total: Q.
              {carrito.reduce(
                (acc, producto) => acc + producto.precio * producto.cantidad,
                0
              )}
            </h2>
          </div>
        </div>
        <div className="w-2/4 flex flex-col justify-center items-center">
          <h1 className="mb-4">Informacion Mapa</h1>
          {renderMap()}
        </div>
      </div>
    </div>
  );
};

export default Pedido;
