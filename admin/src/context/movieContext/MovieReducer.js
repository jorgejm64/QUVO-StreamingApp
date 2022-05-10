//Tomará nuestras acciones y nos actualizará el estado del context
const MovieReducer = (state, action) => {
  //Cuando se habla de state se hace referencia a los datos que ya poseemos en BD
  //Action es la accion que se va a realizar
  switch (action.type) {
    case "GET_MOVIES_START":
      return {
        movies: [],
        isFetching: true,
        error: false,
      };
    case "GET_MOVIES_SUCCESS":
      return {
        movies: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_MOVIES_FAILURE":
      return {
        movies: [],
        isFetching: false,
        error: true,
      };
    case "CREATE_MOVIE_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_MOVIE_SUCCESS":
      return {
        //Todas las peliculas seguiran, añadimos otra
        movies: [...state.movies, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_MOVIE_FAILURE":
      return {
        //Se mantiene el estado actual
        ...state,
        isFetching: false,
        error: true,
      };
    case "UPDATE_MOVIE_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "UPDATE_MOVIE_SUCCESS":
      return {
        movies: state.movies.map(
          (movie) => movie._id === action.payload._id && action.payload
        ),
        isFetching: false,
        error: false,
      };
    case "UPDATE_MOVIE_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "DELETE_MOVIE_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_MOVIE_SUCCESS":
      return {
        movies: state.movies.filter((movie) => movie._id !== action.payload),
        isFetching: false,
        error: false,
      };
    case "DELETE_MOVIE_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default MovieReducer;