import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { clearMarkers, clearPolyline, init, setMarker, setPolyline } from './mapService';
import './Map.css';
import { StoreState, Location } from '../../store/types';
import { createLocation } from '../../store/locations';
import get from '../../lib/get';

interface State {

}

interface Props {
    locations: Location[],
    addLocation: (e: L.LeafletMouseEvent) => void
}

function isSame<T>(a: T[], b: T[]): boolean {
    return a.length === b.length && a.every((item, index) => item === b[index]);
}
class Map extends Component<Props, State> {
    map = createRef<HTMLDivElement>();

    shouldComponentUpdate(nextProps: Props) {
        const nextIds = nextProps.locations.map(get("id"));
        const ids = this.props.locations.map(get('id'));

        if (!isSame(nextIds, ids)) {
            const points = nextProps.locations.map(get("latlng"));
            clearPolyline();
            clearMarkers();

            setPolyline(points);
            points.forEach((point, i) => setMarker(point, i + 1));
        }

        return false;
    }

    componentDidMount() {
        if (!this.map.current) {
            return;
        }
        const { addLocation } = this.props;

        init({
            parentElement: this.map.current,
            onClick: addLocation
        });
    }

    render() {
        return (
            <div className="map" ref={this.map}>Map</div>
        )
    }
}

export default connect(
    ({ locations }: StoreState) => ({
        locations
    }),
    (dispatch) => ({
        addLocation: ({ latlng }: L.LeafletMouseEvent) => dispatch(createLocation({
            latlng
        }))
    })
)(Map);
