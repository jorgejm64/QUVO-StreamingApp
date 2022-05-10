import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchMovieDataConfig, fetchSerieDataConfig } from "../dataConfig";

export const useRetrieveCategory = (slicedUrl, categoryName) => {

	const dispatch = useDispatch();
	const [categoryData, setCategoryData] = useState();

	useEffect(() => {
		let selectedConfigArray = null;
		switch (slicedUrl) {
			case "":
			case "landing":
			case "movies":
				selectedConfigArray = fetchMovieDataConfig;
				break;
			case "series":
				selectedConfigArray = fetchSerieDataConfig;
				break;
			default:
				break;
		}
		console.log(selectedConfigArray)
		if (selectedConfigArray !== null) {
			var [data] = selectedConfigArray.filter(el => el.genre === categoryName);
			dispatch(data.thunk(`${data.url}`));
			setCategoryData(data);
		}

	}, [dispatch, categoryName, slicedUrl])

	return categoryData;
}