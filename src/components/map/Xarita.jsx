import React, { useState } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

function Xarita() {
    const [coordinates, setCoordinates] = useState([41.311151, 69.279737]);

    const handleClick = (e) => {
        const coords = e.get('coords');
        setCoordinates(coords);
        console.log(`Koordinatalar: ${coords[0]}, ${coords[1]}`);
    };

    return (
        <YMaps>
            <Map
                defaultState={{ center: [41.311151, 69.279737], zoom: 8 }}
                width="100%"
                height="400px"
                onClick={handleClick}
            >
                <Placemark geometry={coordinates} />
            </Map>
        </YMaps>
    );
}

export default Xarita;