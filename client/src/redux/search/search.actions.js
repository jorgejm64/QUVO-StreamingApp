import { searchActionTypes } from "./search.types";
import axios from "../../axiosInstance";
import requests from "../../requests";

export const changeSearchInputValue = inputValue => ({
	type: searchActionTypes.CHANGE_SEARCH_INPUT_VALUE,
	payload: inputValue
})

export const clearSearchInputValue = () => ({
	type: searchActionTypes.CLEAR_SEARCH_INPUT_VALUE
})

export const fetchSearchResultsRequest = searchQuery => ({
	type: searchActionTypes.FETCH_SEARCH_RESULTS_REQUEST,
	payload: searchQuery
})

export const fetchSearchResultsSuccess = searchResults => ({
	type: searchActionTypes.FETCH_SEARCH_RESULTS_SUCCESS,
	payload: searchResults
})

export const fetchSearchResultsFailure = errorMessage => ({
	type: searchActionTypes.FETCH_SEARCH_RESULTS_FAILURE,
	payload: errorMessage
})


export const fetchSearchResultsAsync = (searchQuery, mediaType) => {
	return dispatch => {
		dispatch(fetchSearchResultsRequest(searchQuery));
		axios.get(`${requests.fetchSearchQuery}${searchQuery}&&type=${mediaType}`, {
            headers: {
              token:
                "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
          })
		  .then((res) => {
			const results = res.data.map((el) => ({
			  ...el,
			}));
			dispatch(fetchSearchResultsSuccess(results));
		})
			.catch(err => {
				dispatch(fetchSearchResultsFailure(err.message));
			});
	}
}