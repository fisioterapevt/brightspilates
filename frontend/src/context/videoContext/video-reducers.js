import { updateObject } from "../../shared/updateObject";
import * as actionTypes from "../actionTypes";

//******************************************/
//***************** CREATE *****************/
//******************************************/
const createStart = (state, action) => {
	return updateObject(state, { loading: true });
};

const create = (state, video) => {
	return updateObject(state, {
		loading: false,
		successCreate: true,
		video: video,
	});
};

export const resetCreation = (state) => {
	return updateObject(state, {
		//createdVideo: {},
		successCreate: false,
		loading: false,
	});
};

export const createError = (state, error) => {
	return updateObject(state, {
		loading: false,
		httpError: error,
	});
};

//******************************************/
//***************** GET VIDEOS *************/
//******************************************/
const getVideosStart = (state, action) => {
	return updateObject(state, { loading: true });
};

export const getAllVideos = (state, data) => {
	//console.log("getAllVideos VIDEO REDUCERS", state); //! DELETE
	return updateObject(state, {
		loading: false,
		videos: data,
		successDelete: false,
	});
};
export const getVideosError = (state, error) => {
	return updateObject(state, {
		loading: false,
		httpError: error,
	});
};

//export const updateUserProfile = (state, data) => {
//	let updatedUserLogin = state.userLogin;
//	updatedUserLogin = updateObject(state.userLogin, {
//		userInfo: data,
//	});
//	return updateObject(state, {
//		loading: false,
//		httpError: null,
//		userLogin: updatedUserLogin,
//	});
//};

//******************************************/
//***************** DELETE VIDEO *************/
//******************************************/
const deleteStart = (state, action) => {
	console.log("deleteStart");
	return updateObject(state, { loading: true });
};

export const deleteVideo = (state) => {
	console.log("deleteSuccess");
	return updateObject(state, {
		loading: false,
		successDelete: true,
	});
};

export const deleteError = (state, error) => {
	return updateObject(state, {
		loading: false,
		successDelete: false,
		httpError: error,
	});
};

export const videoReducer = (state, action) => {
	switch (action.type) {
		case actionTypes.VIDEO_CREATE_REQUEST:
			return createStart(state);
		case actionTypes.VIDEO_CREATE_SUCCESS:
			return create(state, action.payload);
		case actionTypes.VIDEO_CREATE_FAIL:
			return createError(state, action.payload);
		case actionTypes.VIDEO_CREATE_RESET:
			return resetCreation(state);

		case actionTypes.VIDEO_LIST_REQUEST:
			return getVideosStart(state);
		case actionTypes.VIDEO_LIST_SUCCESS:
			return getAllVideos(state, action.payload);
		case actionTypes.VIDEO_LIST_FAIL:
			return getVideosError(state, action.payload);

		case actionTypes.VIDEO_DELETE_REQUEST:
			return deleteStart(state);
		case actionTypes.VIDEO_DELETE_SUCCESS:
			return deleteVideo(state, action.payload);
		case actionTypes.VIDEO_DELETE_FAIL:
			return deleteError(state, action.payload);

		default:
			return state;
	}
};
