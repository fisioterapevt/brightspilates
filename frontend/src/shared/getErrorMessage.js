export const getErrorMessage = (error) => {
	let message = null;
	//console.log(error.data.error.message);
	switch (error.data.error.message) {
		case `INVALID_EMAIL`:
			message = `The email address is badly formatted.`;
			break;
		case `EMAIL_EXISTS`:
			message = `The email address is already in use by another account.`;
			break;
		case `INVALID_PASSWORD`:
			message = `The password is invalid or the user does not have a password.`;
			break;
		case `EMAIL_NOT_FOUND`:
			message = `	There is no user record corresponding to this identifier. The user
							may have been deleted.`;
			break;
		case `USER_DISABLED`:
			message = `The user account has been disabled by an administrator.`;
			break;
		default:
			message = null;
			break;
	}
	return message;
};
