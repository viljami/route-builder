import React, { MouseEvent, useRef } from 'react';
import * as gps from "gps-util";
import get from "../lib/get";
import { Location, StoreState } from '../store/types';
import { connect } from 'react-redux';
import './DownloadButton.css';

function defer(fn: Function) {
    setTimeout(fn, 100);
}

function removeTime(gpx: string, time: Date): string {
  return gpx.split(`<time>${time.toISOString()}</time>`).join("");
}

async function locationsToGPX(locations: Location[]) {
    const time = new Date();

    const points = locations
        .map(get("latlng"))
        .map((point, i) => ({
            ...point,
            time
        }));

    return new Promise((resolve, reject) =>
        gps.toGPX(
            { points },
            (err: Error, result: string) => err ? reject(err) : resolve(removeTime(result, time)),
        "route.gpx"
        )
    );
}

interface Props {
    locations: Location[]
}

function DownloadButton ({ locations }: Props) {
    const link = useRef(null);

    let isClicked = false;

    const download = (event: MouseEvent<HTMLAnchorElement>) => {
        if (isClicked) {
            return;
        }

        event.preventDefault();
        isClicked = true;

        locationsToGPX(locations)
            .then(result => {
                const gpxFileData = `data:text/plain;charset=utf-8,${result}`;

                const anchor = link.current! as HTMLAnchorElement;
                (anchor).setAttribute('href', gpxFileData);

                anchor.click();
                defer(() => isClicked = false);
            });
    };

    return (
        <a
            type="button"
            href="/"
            download="your-route.gpx"
            ref={link}
            className="download-button to-bottom"
            onClick={download}
        >
        Download your Route
      </a>
    );
}

export default connect(
    ({ locations }: StoreState) => ({
        locations
    })
)(DownloadButton);
