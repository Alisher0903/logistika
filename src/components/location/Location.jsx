
import React, { useState } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

function Location (){
    const [coordinates, setCoordinates] = useState([41.311151, 69.279737]);

    const handleClick = (e) => {
        const coords = e.get('coords');
        setCoordinates(coords);
        sessionStorage.setItem("lat", coords[0])
        sessionStorage.setItem("long", coords[1])
    };

    return (
        <div className='map-main'>
            <div className='map-box'>
                <YMaps>
                    <Map
                        defaultState={{ center: [41.311151, 69.279737], zoom: 8 }}
                        width="100%"
                        height="100%"
                        onClick={handleClick}
                    >
                        <Placemark defaultGeometry={{ center: [41.311151, 69.279737], zoom: 8 }} geometry={coordinates} />
                    </Map>
                </YMaps>
            </div>

        </div>
    );
}