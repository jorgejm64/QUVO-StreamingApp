export const BASE_URL_CONTENT = "http://localhost:8800/"
export const BASE_URL_MEDIA_SERVER = "http://localhost:8500/data/";

export const FALLBACK_IMG_URL = "./QUVO-logo.png";
export const LOGO_URL  = "./QUVO-logo_main.svg";
export const MOBILE_LOGO_URL  = "./mini-logo.png";
export const PROFILE_DEFAULT_PIC_URL = "./defaultProfilePic.jpg";
export const AUTH_BGIMG_URL = "./auth_bck_file_cor.jpg";
export const HOME_BCK_IMG = "./assets/img/bck-home-bundle-6400x2640.jpg";
export const CREDITS_DEFAULT_IMG = BASE_URL_CONTENT+"/users/cast/default.svg";


const requests = {
    //Search
    fetchSearchQuery: "/search?q=",
    
    //Movies
    fetchActionMovies: "/movies?genre=Acción",
    fetchAdventureMovies: "/movies?genre=Aventura",
    fetchComedyMovies: "/movies?genre=Comedia",
    fetchCrimeMovies: "/movies?genre=Crimen",
    fetchDocumentaryMovies: "/movies?genre=Documental",
    fetchDramaMovies: "/movies?genre=Drama",
    fetchHistoryMovies: "/movies?genre=Historia",
    fetchHorrorMovies: "/movies?genre=Terror",
    fetchMusicMovies: "/movies?genre=Música",
    fetchMysteryMovies: "/movies?genre=Misterio",
    fetchRomanceMovies: "/movies?genre=Romance",
    fetchScifyMovies: "/movies?genre=Ciencia%20ficción",
    fetchSuspenseMovies: "/movies?genre=Suspense",
    fetchWarMovies: "/movies?genre=Bélica",

    //series
    fetchActionSeries: "/series?genre=Acción",
    fetchAdventureSeries: "/series?genre=Aventura",
    fetchComedySeries: "/series?genre=Comedia",
    fetchCrimeSeries: "/series?genre=Crimen",
    fetchDocumentarySeries: "/series?genre=Documental",
    fetchDramaSeries: "/series?genre=Drama",
    fetchHistorySeries: "/series?genre=Historia",
    fetchHorrorSeries: "/series?genre=Terror",
    fetchMusicSeries: "/series?genre=Música",
    fetchMysterySeries: "/series?genre=Misterio",
    fetchRomanceSeries: "/series?genre=Romance",
    fetchScifySeries: "/series?genre=Ciencia%20ficción",
    fetchSuspenseSeries: "/series?genre=Suspense",
    fetchWarSeries: "/series?genre=Bélica",
}


export default requests;