import { GET_ALBUMS, SET_LOADING, SORT_ALBUMS } from "../types"

const initialState = {
    albums: [],
    loading: true,
}

export default function (state = initialState, action) {

    switch (action.type) {

        case GET_ALBUMS:
            return {
                ...state,
                albums: action.payload,
                loading: false
            }
        case SORT_ALBUMS:
            return {
                ...state,
                albums: action.payload,
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        default: return state
    }

}