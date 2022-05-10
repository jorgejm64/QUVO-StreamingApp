import { usersActionTypes } from "./user.types";
import axios from "../../axiosInstance";

export const fetchUserDataRequest = (userQuery) => ({
  type: usersActionTypes.FETCH_USER_DATA_REQUEST,
  payload: userQuery,
});

//Fetch user data
export const fetchUserDataSuccess = (userResults) => ({
  type: usersActionTypes.FETCH_USER_DATA_SUCCESS,
  payload: userResults,
});

export const fetchUserDataFailure = (errorMessage) => ({
  type: usersActionTypes.FETCH_USER_DATA_FAILURE,
  payload: errorMessage,
});

export const fetchUserDataAsync = () => {
  return (dispatch) => {
    dispatch(fetchUserDataRequest());
    axios
      .get("/user/find", {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((res) => {
        const results = res.data;
        dispatch(fetchUserDataSuccess(results));
      })
      .catch((err) => {
        dispatch(fetchUserDataFailure(err.message));
      });
  };
};

//Reset password
export const resetUserPassRequest = (userQuery) => ({
  type: usersActionTypes.RESET_USER_PASS_REQUEST,
  payload: userQuery,
});

export const resetUserPassSuccess = (userResults) => ({
  type: usersActionTypes.RESET_USER_PASS_SUCCESS,
  payload: userResults,
});

export const resetUserPassFailure = (errorMessage) => ({
  type: usersActionTypes.RESET_USER_PASS_FAILURE,
  payload: errorMessage,
});

export const resetUserPassAsync = (data, userId, resetToken) => {
  return (dispatch) => {
    dispatch(resetUserPassRequest());
    axios
      .post(`/password-reset/${userId}/${resetToken}`, data)
      .then((res) => {
        const results = res.data;

        if (results.status === "SUCCESS") {
          window.location.assign("/signin");
        }
        dispatch(resetUserPassSuccess(results));
      })
      .catch((err) => {
        dispatch(resetUserPassFailure(err.message));
      });
  };
};

//update user data
export const updateUserDataRequest = () => ({
  type: usersActionTypes.UPDATE_USER_DATA_REQUEST,
});

export const updateUserDataSuccess = (userResults) => ({
  type: usersActionTypes.UPDATE_USER_DATA_SUCCESS,
  payload: userResults,
});

export const updateUserDataFailure = (errorMessage) => ({
  type: usersActionTypes.UPDATE_USER_DATA_FAILURE,
  payload: errorMessage,
});

export const updateUserDataAsync = (data) => {
  const config = {
    headers: {
      token: `Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`,
    },
  };
  return (dispatch) => {
    dispatch(updateUserDataRequest());
    axios
      .put("/user/update", data, config)
      .then((res) => {
        const results = res.data;
        document.location.reload();
        dispatch(updateUserDataSuccess(results));
      })
      .catch((err) => {
        dispatch(updateUserDataFailure(err.response.data.message));
      });
  };
};

//Cancel user subscription
export const cancelSubscriptionUserRequest = () => ({
  type: usersActionTypes.CANCEL_USER_SUBSCRIPTION_REQUEST,
});

export const cancelSubscriptionUserSuccess = (userResults) => ({
  type: usersActionTypes.CANCEL_USER_SUBSCRIPTION_SUCCESS,
  payload: userResults,
});

export const cancelSubscriptionUserFailure = (errorMessage) => ({
  type: usersActionTypes.CANCEL_USER_SUBSCRIPTION_FAILURE,
  payload: errorMessage,
});

export const cancelSubscriptionUserAsync = () => {
  return (dispatch) => {
    dispatch(cancelSubscriptionUserRequest());
    axios
      .get("/stripe/cancel-subscription", {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((res) => {
        const results = res.data;
        localStorage.removeItem("user");
        window.location.assign("/")
        dispatch(cancelSubscriptionUserSuccess(results));
      })
      .catch((err) => {
        console.log(err);
        dispatch(cancelSubscriptionUserFailure(err.message));
      });
  };
};
