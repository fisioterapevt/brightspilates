import { updateObject } from "../../shared/updateObject";
import * as actionTypes from "../actionTypes";

//**********************************/
//************* USER ***************/
//**********************************/
const createStart = (state, action) => {
	return updateObject(state, {
		//loading: true,
		//message: null,
		//httpError: null,
	});
};

const deleteStart = (state, action) => {
	return updateObject(state, {
		//loading: true,
		//message: null,
		//httpError: null,
	});
};

const payStart = (state) => {
	return updateObject(state, {
		//loading: true,
		//message: null,
		//httpError: null,
	});
};

const getListStart = (state, action) => {
	return updateObject(state, {
		getListLoading: true,
		message: null,
		httpError: null,
	});
};

export const createOrder = (state, data) => {
	return updateObject(state, {
		success: true,
		loading: false,
		order: data,
	});
};

export const getOrder = (state, data) => {
	console.log(data);
	return updateObject(state, {
		loading: false,
		successDelete: false,
		users: data,
	});
};

export const deleteOrder = (state) => {
	return updateObject(state, {
		order: null,
		loading: false,
		success: false,
		message: null,
		httpError: null,
		successDelete: true,
	});
};

export const getOrderList = (state, data) => {
	return updateObject(state, {
		orders: data,
		getListLoading: false,
		successDelete: false,
		message: null,
		httpError: null,
	});
};

export const payOrder = (state, data) => {
	console.log(data);
	return updateObject(state, {
		order: data,
		success: false,
		//getListLoading: false,
		//successDelete: false,
		//message: null,
		//httpError: null,
	});
};

export const passError = (state, error) => {
	//console.log(`ERROR FROM user REDUCERS: `, error);
	return updateObject(state, {
		loading: false,
		getListLoading: false,
		httpError: error,
	});
};

export const resetOrderState = (state) => {
	return updateObject(state, {
		order: null,
		orders: [],
		loading: false,
		success: false,
		message: null,
		httpError: null,
	});
};

export const orderReducer = (state, action) => {
	switch (action.type) {
		case actionTypes.ORDER_CREATE_REQUEST:
			return createStart(state);
		case actionTypes.ORDER_CREATE_SUCCESS:
			return createOrder(state, action.payload);
		case actionTypes.ORDER_CREATE_FAIL:
			return passError(state, action.payload);
		case actionTypes.ORDER_DELETE_REQUEST:
			return deleteStart(state);
		case actionTypes.ORDER_DELETE_SUCCESS:
			return deleteOrder(state);
		case actionTypes.ORDER_DELETE_FAIL:
			return passError(state, action.payload);
		case actionTypes.ORDER_LIST_REQUEST:
			return getListStart(state);
		case actionTypes.ORDER_LIST_SUCCESS:
			return getOrderList(state, action.payload);
		case actionTypes.ORDER_LIST_FAIL:
			return passError(state, action.payload);
		case actionTypes.ORDER_PAY_REQUEST:
			return payStart(state);
		case actionTypes.ORDER_PAY_SUCCESS:
			return payOrder(state, action.payload);
		case actionTypes.ORDER_STATE_RESET:
			return resetOrderState(state);
		default:
			return state;
	}
};
