export type LocationId = string;

export interface Action<T> {
    type: string,
    payload: T
}

export interface Location {
    id: LocationId,
    latlng: L.LatLng
}

export interface LocationMove {
    fromId: LocationId,
    toId: LocationId
}

export interface StoreState {
    locations: Location[]
}
