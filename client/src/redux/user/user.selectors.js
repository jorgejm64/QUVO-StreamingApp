import { createSelector } from "reselect";

const selectUserData = (state) => state.user.dataUser;
const selectResetPass = (state) => state.user.resetPass;
const selectUserUpdate = (state) => state.user.updateUser;
const selectUserSubscription = (state) => state.user.subscriptionUser;

export const selectUserDataSelector = createSelector(
	[selectUserData],
	dataUser => dataUser.data
);

export const selectResetPassStatusSelector = createSelector(
	[selectResetPass],
	(resetPass) => resetPass.data
);

export const selectUpdateUserStatusSelector = createSelector(
	[selectUserUpdate],
	updateUser => updateUser.data
);

export const selectSubscriptionUserSelector = createSelector(
	[selectUserSubscription],
	subscriptionUser => subscriptionUser.data
);
