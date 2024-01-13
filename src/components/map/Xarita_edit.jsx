import React, { useState } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

function XaritaEdit({ latitude, longitude }) {
    const [coordinates, setCoordinates] = useState([latitude, longitude]);

    const handleClick = (e) => {
        const coords = e.get('coords');
        setCoordinates(coords);
        sessionStorage.setItem("lat", coords[0])
        sessionStorage.setItem("long", coords[1])

        const apiKey = '1248def2-c2d9-4353-90a7-01b7e5703e21';

        const geocodeUrl = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${apiKey}&geocode=${coords[1]},${coords[0]}`;

        fetch(geocodeUrl)
            .then(response => response.json())
            .then(data => {
                const address = data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.text;
                sessionStorage.setItem("address", address)
            })
            .catch(error => console.error('Xatolik yuz berdi: ', error));
    };

    return (
        <div className='map-main'>
            <div className='map-box'>
                <YMaps>
                    <Map
                        defaultState={{ center: [latitude, longitude], zoom: 8, }}
                        width="100%"
                        height="100%"
                        onClick={handleClick}
                    >
                        <Placemark geometry={coordinates} />
                    </Map>
                </YMaps>
            </div>

        </div>
    );
}

export default XaritaEdit;