import React, { useCallback, useReducer } from "react";
import axios from "axios";

import * as actionTypes from "../actionTypes";
import VideoContext from "./video-context";
import { videoReducer } from "./video-reducers";

export const VideoState = ({ children }) => {
	const initialState = {
		video: {},
		videos: [],
		httpError: null,
		loading: false,
		successCreate: false,
		successDelete: false,
		successUpdate: false,
	};

	const [videoState, dispatch] = useReducer(videoReducer, initialState);

	//********* CLIENT ********* */
	//@ get all videos
	const listVideos = useCallback(async () => {
		//console.log("listVideos VIDEO STATE"); //! DELETE
		try {
			dispatch({ type: actionTypes.VIDEO_LIST_REQUEST });

			const { data } = await axios.get(`/api/videos`);

			dispatch({ type: actionTypes.VIDEO_LIST_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: actionTypes.VIDEO_LIST_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	}, []);

	//********* ADMIN ********* */
	//@ createVideo
	const createVideo = async (userInfo) => {
		try {
			dispatch({
				type: actionTypes.VIDEO_CREATE_REQUEST,
			});

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const { data } = await axios.post(`/api/videos`, {}, config);

			dispatch({
				type: actionTypes.VIDEO_CREATE_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: actionTypes.VIDEO_CREATE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

	const deleteVideo = async (id, userInfo) => {
		try {
			dispatch({
				type: actionTypes.VIDEO_DELETE_REQUEST,
			});

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			await axios.delete(`/api/videos/${id}`, config);

			dispatch({
				type: actionTypes.VIDEO_DELETE_SUCCESS,
			});
		} catch (error) {
			dispatch({
				type: actionTypes.VIDEO_DELETE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

	const resetVideoCreation = useCallback(() => {
		dispatch({
			type: actionTypes.VIDEO_CREATE_RESET,
		});
	}, []);

	return (
		<VideoContext.Provider
			value={{
				video: videoState.video,
				videos: videoState.videos,
				successCreate: videoState.successCreate,
				successDelete: videoState.successDelete,
				successUpdate: videoState.successUpdate,
				loading: videoState.loading,
				getAllVideos: listVideos,
				createVideo,
				deleteVideo,
				resetVideoCreation,
			}}
		>
			{children}
		</VideoContext.Provider>
	);
};
