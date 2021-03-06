import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case REGISTER_SUCCESS:
			localStorage.setItem('contactbook-token', action.payload.token);
			return {
				...state,
				token: action.payload.token,
				isAuthenticated: true,
				loading: false
			};

		case REGISTER_FAIL:
		case LOGIN_FAIL:
		case AUTH_ERROR:
		case LOGOUT:
			localStorage.removeItem('contactbook-token');
			return {
				...state,
				error: action.payload,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null
			};

		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			};

		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload
			};

		case LOGIN_SUCCESS:
			localStorage.setItem('contactbook-token', action.payload.token);
			return {
				...state,
				token: action.payload.token,
				isAuthenticated: true,
				loading: false
			};

		default:
			return state;
	}
};
