import React, { useState } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

function LocationE({ latitude, longitude }) {
    const [coordinates, setCoordinates] = useState([latitude, longitude]);

    return (
        <div className='map-mainloc'>
            <div className='map-boxloc'>
                <YMaps>
                    <Map
                        defaultState={{ center: [latitude, longitude], zoom: 8 }}
                        width="100%"
                        height="100%"
                    >
                        <Placemark geometry={coordinates} />
                    </Map>
                </YMaps>
            </div>
        </div>
    );
}

export default LocationE;