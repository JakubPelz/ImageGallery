import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import axios from 'axios';

export interface Image {
  address: string;
  register_date: Date;
  _id: number;
}

export interface Gallery {
  _id: number;
  gallery_name: string;
  gallery_description: string;
  photos: [Image];
}

export interface FetchGalleriesAction {
  type: ActionTypes.fetchGalleries;
  payload: Gallery[];
}

export interface ShowGalleries {
  galleries: Gallery[];
}

const url = 'http://localhost:8000/api/show-galleries';

export const fetchGalleries = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<Gallery[]>(url);

    dispatch<FetchGalleriesAction>({
      type: ActionTypes.fetchGalleries,
      payload: response.data,
    });
    /*   console.log(response.data); */
  };
};
