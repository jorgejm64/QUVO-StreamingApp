import MovieReducer from "./MovieReducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  movies: [],
  isFetching: false,
  error: false,
};

export const MovieContext = createContext(INITIAL_STATE);

export const MovieContextProvider = ({ children }) => {
  const [state, dispatchMovies] = useReducer(MovieReducer, INITIAL_STATE);

  return (
    <MovieContext.Provider
      value={{
        movies: state.movies,
        isFetching: state.isFetching,
        error: state.error,
        dispatchMovies,
      }}>{children}
    </MovieContext.Provider>
  );
};