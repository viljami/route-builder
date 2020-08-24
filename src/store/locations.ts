import { v4 as uuid } from 'uuid';
import { Action, Location, LocationMove, LocationId } from './types';

const initialState: Location[] = [];

const CREATE_LOCATION = 'LOCATION::CREATE';
const REMOVE_LOCATION = 'LOCATION::REMOVE';
const REORDER_LOCATION = 'LOCATION::REORDER';

export const createLocation = (location: Partial<Location>) => ({
    type: CREATE_LOCATION,
    payload: {
        ...location,
        id: uuid()
    }
});

export const removeLocation = (id: LocationId) => ({
    type: REMOVE_LOCATION,
    payload: id
});

export const reorderLocation = (fromId: LocationId, toId: LocationId) => ({
    type: REORDER_LOCATION,
    payload: { fromId, toId }
})

export default (state = initialState, action: Action<Location | LocationMove | LocationId>) => {
    switch (action.type) {
        case CREATE_LOCATION:
            return state.concat(action.payload as Location);
        case REMOVE_LOCATION:
            const removedId = action.payload as LocationId;
            return state.filter(({ id }: Location) => id !== removedId);
        case REORDER_LOCATION:
            const { fromId, toId } = action.payload as LocationMove;
            const fromIndex = state.findIndex(({ id }: Location) => id === fromId);
            const toIndex = state.findIndex(({ id }: Location) => id === toId);

            if (fromIndex === -1 || toIndex === -1) {
                return state;
            }

            const from = state[fromIndex];
            const to = state[toIndex];
            const newState = [...state];
            newState.splice(toIndex, 1, from);
            newState.splice(fromIndex, 1, to);
            return newState;
        default:
            return state;
    }
};
