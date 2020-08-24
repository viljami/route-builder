import React, { MouseEvent } from 'react';
import { Location } from '../store/types';
import './LocationItem.css';

interface Props {
    location: Location,
    orderNro: number,
    onClick: (event: MouseEvent) => void,
}

export default function LocationItem({
    location,
    orderNro,
    onClick,
}: Props) {
    return (
      <li className="location-item fa-ul" id={location.id} draggable>
        <span className="fa-li">
          <i className="fas fa-bars"></i>
        </span>
        Waypoint {orderNro}
        <button className="fa fa-trash" onClick={onClick}></button>
      </li>
    );
}
