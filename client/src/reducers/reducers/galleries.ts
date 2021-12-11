import { Gallery, Action, ActionTypes } from '../actions';

export const galleriesReducer = (state: Gallery[] = [], action: Action) => {
  switch (action.type) {
    case ActionTypes.fetchGalleries:
      return action.payload;
    default:
      return state;
  }
};
