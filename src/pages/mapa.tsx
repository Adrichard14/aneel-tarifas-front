import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker } from 'react-map-gl';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Pin from '../components/pin/pin';
import { Row, Col, Table as CustomTable } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';

const MapPage = ({ props }: any) => {
  const [locations, setLocations] = useState([]);
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const locationsURL = `${apiURL}/locations`;
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const { data } = await axios.get(locationsURL);
        setLocations(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLocation();
  }, []);

  return (
    <Row className="justify-content-center align-items-center mt-3 flex-column mb-5">
      <Col lg={12} className="d-flex justify-content-center flex-column mb-5">
        <h3 className="my-4">Mapa interativo com a localização dos acessos</h3>

        <Map
          mapboxAccessToken="pk.eyJ1IjoiYWRyaWNoYXJkMTRhY2FkZW1pY28iLCJhIjoiY2xsZmYzdmtqMGZnZjNscW9yc3Zkd21wZiJ9.kIQA9nyxKR5zhY0tPc31Pg"
          initialViewState={{
            longitude: -37.05,
            latitude: -10.93,
            zoom: 2
          }}
          style={{ width: 900, height: 500 }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
        >
          {locations.map((city: any, index: number) => (
            <Marker
              key={`marker-${index}`}
              longitude={city.longitude}
              latitude={city.latitude}
              anchor="bottom"
            >
              <Pin />
            </Marker>
          ))}
        </Map>
      </Col>
      <Col className="d-flex flex-column">
        <h3 className="my-2">Tabela com a localização dos acessos</h3>
        <CustomTable striped bordered hover className="my-4">
          <thead>
            <tr>
              <th>Cidade</th>
              <th>País</th>
              <th>Estado</th>
              <th>Data de acesso</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((row: any) => (
              <tr key={row.id}>
                <td>{row.city}</td>
                <td>{row.region}</td>
                <td>{row.country}</td>
                <td>{moment(row.created_at).format('DD/MM/YYYY h:mm:ss')}</td>
              </tr>
            ))}
          </tbody>
        </CustomTable>
      </Col>
    </Row>
  )
}

export default MapPage;