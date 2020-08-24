import React from 'react';
import { connect } from 'react-redux';
import { Location, StoreState } from '../store/types';
import * as gps from 'gps-util';
import get from '../lib/get';

interface Props {
    locations: Location[]
}

function TotalDistance({ locations }: Props) {
    return (
        <p>
            Distance: {
                (Math.round(gps.getTotalDistance(locations.map(get('latlng')))) / 1000).toFixed(1)
            } km
        </p>
    );
}

export default connect(
    ({ locations }: StoreState) => ({
        locations
    })
)(TotalDistance);
