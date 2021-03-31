import { keyframes } from "styled-components";

export const getLatLongDistance = (lat1, long1, lat2, long2) => {
    const earthRadius = 6371;
    let radianLat = degtoRadian(lat2 - lat1);
    let radianLong = degtoRadian(long2 - long1);

    let a =
        Math.sin(radianLat / 2) * Math.sin(radianLat / 2) +
        Math.cos(degtoRadian(lat1)) * Math.cos(degtoRadian(lat2)) *
        Math.sin(radianLong / 2) * Math.sin(radianLong / 2)
        ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = earthRadius * c; // Distance in km
    return distance;
}

const degtoRadian = (deg) => {
    return deg * (Math.PI / 180);
}

export const AVERAGE_BIKE_SPEED = 20;//km/hr

export const timeConverter=(time)=>{
    let hours=(time/60);
    let flooredHour=Math.floor(hours);
    let minutes=Math.round((hours-flooredHour)*60);
    return flooredHour+"hr : "+minutes+"m";
}