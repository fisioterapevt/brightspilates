import React, { useCallback, useReducer } from "react";
import axios from "axios";

import * as actionTypes from "../actionTypes";
import OrderContext from "./order-context";
import { orderReducer } from "./order-reducers";

const orderItemFromStorage = localStorage.getItem("order")
	? JSON.parse(localStorage.getItem("order"))
	: null;

//const userInfoFromStorage = localStorage.getItem("userInfo")
//	? JSON.parse(localStorage.getItem("userInfo"))
//	: null;

export const OrderState = ({ children }) => {
	const initialState = {
		order: orderItemFromStorage,
		successDelete: false,
		orders: [],
		success: false,
		loading: false,
		getListLoading: false,
		message: null,
		httpError: null,
	};

	const [orderState, dispatch] = useReducer(orderReducer, initialState);

	const createOrder = async (order, userInfo) => {
		try {
			dispatch({
				type: actionTypes.ORDER_CREATE_REQUEST,
			});

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const { data } = await axios.post("/api/orders", order, config);

			dispatch({ type: actionTypes.ORDER_CREATE_SUCCESS, payload: data });

			localStorage.setItem("order", JSON.stringify(data));
		} catch (error) {
			dispatch({
				type: actionTypes.ORDER_CREATE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

	const deleteOrder = async (id, userInfo) => {
		try {
			dispatch({
				type: actionTypes.ORDER_DELETE_REQUEST,
			});

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			await axios.delete(`/api/orders/${id}`, config);

			dispatch({
				type: actionTypes.ORDER_DELETE_SUCCESS,
			});

			localStorage.removeItem("order");
		} catch (error) {
			dispatch({
				type: actionTypes.ORDER_DELETE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

	const getOrderList = useCallback(async (userInfo) => {
		//console.log("дергает getOrderList из [Order State]");
		try {
			dispatch({
				type: actionTypes.ORDER_LIST_REQUEST,
			});

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const { data } = await axios.get(`/api/orders/orderlist `, config);

			dispatch({
				type: actionTypes.ORDER_LIST_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: actionTypes.ORDER_LIST_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	}, []);

	const payOrder = async (orderId, paymentResult, userInfo) => {
		try {
			dispatch({
				type: actionTypes.ORDER_PAY_REQUEST,
			});
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const { data } = await axios.put(
				`/api/orders/${orderId}/pay`,
				paymentResult,
				config
			);

			dispatch({
				type: actionTypes.ORDER_PAY_SUCCESS,
				payload: data,
			});

			localStorage.setItem("order", JSON.stringify(data));
		} catch (error) {
			dispatch({
				type: actionTypes.ORDER_PAY_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

	const resetOrderState = () => {
		dispatch({
			type: actionTypes.ORDER_STATE_RESET,
		});

		localStorage.removeItem("order");
	};

	return (
		<OrderContext.Provider
			value={{
				order: orderState.order,
				userLogin: orderState.userLogin,
				orders: orderState.orders,
				success: orderState.success,
				successDelete: orderState.successDelete,
				getListLoading: orderState.getListLoading,
				loading: orderState.loading,
				httpError: orderState.httpError,
				message: orderState.message,
				createOrder,
				deleteOrder,
				getOrderList,
				payOrder,
				resetOrderState,
			}}
		>
			{children}
		</OrderContext.Provider>
	);
};
