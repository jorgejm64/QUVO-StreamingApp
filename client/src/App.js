import { useEffect } from "react";

//Axios
import axios from "./axiosInstance";

//Router
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

//Components
import Navbar from "./components/Navbar/Navbar";
import DetailModal from "./components/DetailModal/DetailModal";
import VideoPopup from "./components/VideoPopup/VideoPopup";

//Pages
import Details from "./pages/Details/Details";
import Homepage from "./pages/Homepage/Homepage";
import Movies from "./pages/Movies/Movies";
import SignIn from "./pages/SignIn/SignIn";
import Landing from "./pages/Landing/Landing";
import Search from "./pages/Search/Search";
import Mylist from "./pages/Mylist/Mylist";
import Profile from "./pages/Profile/Profile";
import Series from "./pages/Series/Series";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import PasswordReset from "./pages/PasswordReset/PasswordReset";
import SignUp from "./pages/Signup/SignUp";
import Subscription from "./pages/Subscription/Subscription";
import EmailSend from "./pages/EmailSend/EmailSend";
import Category from "./pages/Category/Category";
import ScrollToTop from "./components/ScrollTop/ScrollTop";

//Motion
import { AnimatePresence } from "framer-motion";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { selectSearchResults } from "./redux/search/search.selector";
import { signOutStart } from "./redux/auth/auth.actions";

const App = () => {
  //Tomar valores del selector
  const searchResults = useSelector(selectSearchResults);

  const location = useLocation();
  const dispatch = useDispatch();

  //Comprobar sesión de usuario
  useEffect(() => {
    if (localStorage.getItem("user")) {
      async function fetchData() {
        await axios
          .get("/auth/check-session", {
            headers: {
              token:
                "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
          })
          .catch(() => {
            dispatch(signOutStart());
          });
      } 
      fetchData()
    }
  }, [dispatch]);

  return (
    <div className="App">
      {localStorage.getItem("user") && (
        <>
          <Navbar />
          <ScrollToTop/>
          <DetailModal />
          <VideoPopup />
        </>
      )}

      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              !localStorage.getItem("user") ? (
                <Homepage />
              ) : (
                <Navigate to="/landing" replace />
              )
            }
          />

          {!localStorage.getItem("tmpSubToken") ? (
            <Route
              exact
              path="/signup"
              element={
                !localStorage.getItem("user") ? (
                  <SignUp />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
          ) : (
            <Route
              exact
              path="/signup"
              element={
                !localStorage.getItem("user") ? (
                  <Navigate to="/subscription" replace />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
          )}

          {!localStorage.getItem("tmpSubToken") ? (
            <Route
              path="/signin"
              element={
                !localStorage.getItem("user") ? (
                  <SignIn />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
          ) : (
            <Route
              path="/signin"
              element={
                !localStorage.getItem("user") ? (
                  <Navigate to="/subscription" replace />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
          )}

          <Route
            path="/forgotPassword"
            element={
              !localStorage.getItem("user") ? (
                <ForgotPassword />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/passwordreset/:userId/:resetToken"
            element={
              !localStorage.getItem("user") ? (
                <PasswordReset />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/emailsend/:email"
            element={
              !localStorage.getItem("user") ? (
                <EmailSend />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {!localStorage.getItem("tmpSubToken") ? (
            <Route path="/subscription" element={<Navigate to="/" replace />} />
          ) : (
            <Route
              path="/subscription"
              element={
                !localStorage.getItem("user") ? (
                  <Subscription />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
          )}

          <Route
            exact
            path="/landing"
            element={
              !localStorage.getItem("user") ? (
                <Navigate to="/" replace />
              ) : (
                <Landing />
              )
            }
          />

          <Route
            path="/movies"
            element={
              !localStorage.getItem("user") ? (
                <Navigate to="/" replace />
              ) : (
                <Movies />
              )
            }
          />

          <Route
            path="/series"
            element={
              !localStorage.getItem("user") ? (
                <Navigate to="/" replace />
              ) : (
                <Series />
              )
            }
          />

          <Route
            path="/search"
            element={
              !localStorage.getItem("user") && searchResults ? (
                <Navigate to="/" replace />
              ) : (
                <Search results={searchResults} />
              )
            }
          />

          <Route
            path="/details/:id"
            element={
              !localStorage.getItem("user") ? (
                <Navigate to="/" replace />
              ) : (
                <Details />
              )
            }
          />

          <Route
            path="/mylist"
            element={
              !localStorage.getItem("user") ? (
                <Navigate to="/" replace />
              ) : (
                <Mylist />
              )
            }
          />

          <Route
            exact
            path="/:type/:categoryName"
            element={
              !localStorage.getItem("user") ? (
                <Navigate to="/" replace />
              ) : (
                <Category />
              )
            }
          />

          <Route
            path="/profile"
            element={
              !localStorage.getItem("user") ? (
                <Navigate to="/" replace />
              ) : (
                <Profile />
              )
            }
          />

          <Route path="*" element={<Navigate to="/landing" replace />}></Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
