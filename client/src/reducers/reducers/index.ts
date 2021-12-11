import { combineReducers } from 'redux';
import { galleriesReducer } from './galleries';
import { Gallery } from '../actions';
export interface StoreState {
  galleries: Gallery[];
}
export const reducers = combineReducers<StoreState>({
  galleries: galleriesReducer,
});
