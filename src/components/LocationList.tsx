import React, { DragEvent } from "react";
import { connect } from 'react-redux';
import { removeLocation, reorderLocation } from "../store/locations";
import { Location, LocationId, StoreState } from "../store/types";
import LocationItem from './LocationItem'
import './LocationList.css';

const dataTransferFormat = 'text/plain';

interface Props {
    locations: Location[],
    move: (fromId: LocationId, toId: LocationId) => void,
    remove: (id: LocationId) => () => void,
}

function stopDead(event: DragEvent<HTMLUListElement>) {
  event.preventDefault();
  event.stopPropagation();
}

function dragStart(event: DragEvent<HTMLUListElement>) {
    const { id: draggedId } = event.target as HTMLLIElement;
    event.dataTransfer.setData(dataTransferFormat, JSON.stringify({ draggedId }));
}

function onDrop(move: (fromId: LocationId, toId: LocationId) => void): (event: DragEvent<HTMLUListElement>) => void {
    return (event: DragEvent<HTMLUListElement>) => {
        const { draggedId } = JSON.parse(event.dataTransfer.getData(dataTransferFormat));
        const target = event.target as HTMLUListElement;
        const { id: targetId } = target;

        if (target.className === 'location-list' || targetId === draggedId) {
            return;
        }

        move(draggedId, targetId);
    };
}

function LocationList({ locations, remove, move }: Props) {
    if (!locations.length) {
        return <p>Click map to add waypoints.</p>;
    }

    return (
        <ul
            className="location-list"
            onDragStart={dragStart}
            onDragOver={stopDead}
            onDrop={onDrop(move)}
        >
            {
                locations
                    .map((location, index) => (
                        <LocationItem
                            key={location.id}
                            location={location}
                            orderNro={index + 1}
                            onClick={remove(location.id)}
                        />
                    ))
            }
        </ul>
    );
}

export default connect(
  ({ locations }: StoreState) => ({ locations }),
  (dispatch) => ({
    remove: (id: LocationId) => () => dispatch(removeLocation(id)),
    move: (fromId: LocationId, toId: LocationId) => dispatch(reorderLocation(fromId, toId))
  })
)(LocationList);
