import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapIcon from '../utils/mapIcon';
import api from '../services/api';
import Sidebar from "../components/Sidebar";

import '../styles/pages/orphanages-map.css';

interface Orphanage {
  id:number;
  latitude:number;
  longitude:number;
  name:string;
}

function OrphanagesMap() {
  const [orphanages, setOrphanages]  = useState<Orphanage[]>([]);
  const [location, setLocation]  = useState({
    latitude:-20.6564795, 
    longitude:-40.4969006
  });

  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    })

    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    
    function success(pos:Position) {
      let {latitude, longitude} = pos.coords;      
      setLocation({latitude:latitude, longitude:longitude});
    };
    
    function error(err:PositionError) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    };
    
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  return (
    <div id="page-map">
      <Sidebar />

      <Map 
        center={[location.latitude,location.longitude]} 
        zoom={16}
        style={{ width:'100%', height:'100%' }}
      >
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}  />

        {orphanages.map(orphanage => {
          return (
            <Marker key={orphanage.id} position={[orphanage.latitude,orphanage.longitude]} icon={mapIcon} >
              <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup" >
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          )
        })}


      </Map>
    </div>
  );
}

export default OrphanagesMap