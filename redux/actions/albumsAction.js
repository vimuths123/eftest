import { GET_ALBUMS, SET_LOADING, ALBUMS_ERROR, SORT_ALBUMS } from "../types";
import axios from "axios";

export const setLoading = () => async dispatch => {
  dispatch({
    type: SET_LOADING,
  });
}

export const sortAlbums = (albums, sortType) => async dispatch => {
  if (sortType == 1) {
    albums = await Promise.all(albums.sort((a, b) => (a.id > b.id) ? 1 : -1));
  } else if (sortType == 2) {
    albums = await Promise.all(albums.sort((a, b) => (a.title > b.title) ? 1 : -1));
  } else if (sortType == 3) {
    albums = await Promise.all(albums.sort((a, b) => (a.title < b.title) ? 1 : -1));
  }

  dispatch({
    type: SORT_ALBUMS,
    payload: albums
  });
}

export const getAlbums = () => async dispatch => {
  try {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/albums?userId=2`);

    const tempArr = JSON.parse(JSON.stringify(res)).data;
    const tempAlbums = await Promise.all(tempArr.map(async (element) => {
      const res2 = await axios.get(`https://jsonplaceholder.typicode.com/albums/${element.id}/photos`);
      const photos = JSON.parse(JSON.stringify(res2)).data;
      return { ...element, photos };
    }));

    dispatch({
      type: GET_ALBUMS,
      payload: tempAlbums
    });


  } catch (e) {
    dispatch({
      type: ALBUMS_ERROR,
      payload: console.log(e)
    });
  }
};
