import L from 'leaflet';
import circleSrc from './circle.png';
console.log(circleSrc);
const accessToken = process.env.REACT_APP_MAP_KEY;

interface MapOptions {
    parentElement: HTMLElement,
    onClick: (e: L.LeafletMouseEvent) => void
}

let map: L.Map;
let polyline: L.Polyline;
const markers: L.Marker[] = [];

const remove = (a: { remove: Function }) => a.remove();

export function getMap(): L.Map {
    if (!map) {
        throw new Error('Initialize the map first.');
    };

    return map;
}

export function setPolyline(points: L.LatLng[]) {
    polyline = L
        .polyline(points, { color: '#1086e8', weight: 5 })
        .addTo(map);
}

export function setMarker(point: L.LatLng, title: number | string) {
    markers.push(L.marker(point, {
        icon: new L.DivIcon({
            className: 'my-div-icon',
            html: `<div style="margin:-5px 0 0 -5px;background-color:#000;color:#fff;font-size: 17px;font-weight:bold;border-radius: 100px;width:25px;height:25px;padding:0 0 0 7px;box-sizing:border-box;">${title}</div>`
        }),
        title: `Waypoint ${title}`,
        alt: `Waypoint ${title}`
    }).addTo(map));
}

export function clearPolyline() {
    if (polyline) {
        polyline.remove();
    }
}

export function clearMarkers() {
    markers.forEach(remove);
    markers.length = 0;
}

export function init({ parentElement, onClick }: MapOptions) {
    if (map) {
        // Already initialized.
        return;
    }

    const seitseminenFinnishNationalPark = new L.LatLng(61.9697, 23.3614);
    map = L.map(parentElement).setView(seitseminenFinnishNationalPark, 12);

    L
        .tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`, {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken
        })
        .addTo(map);

    map.on('click', onClick);
};
