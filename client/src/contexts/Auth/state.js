import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './context';
import AuthReducer from './reducer';
import setAuthToken from '../../utils/setAuthToken';

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

const AuthState = props => {
	const initialState = {
		token: localStorage.getItem('contactbook-token'),
		isAuthenticated: null,
		loading: true,
		user: null,
		error: null
	};

	const [state, dispatch] = useReducer(AuthReducer, initialState);

	// Load User
	const loadUser = async () => {
		if (localStorage['contactbook-token']) {
			setAuthToken(localStorage['contactbook-token']);
		}

		try {
			const res = await axios.get('/api/v1/auth');

			dispatch({ type: USER_LOADED, payload: res.data.data });
		} catch (err) {
			dispatch({ type: AUTH_ERROR });
		}
	};

	//Register User
	const register = async formdata => {
		const config = {
			headers: {
				'Context-Type': 'application/json'
			}
		};

		try {
			const res = await axios.post('/api/v1/users', formdata, config);

			dispatch({ type: REGISTER_SUCCESS, payload: res.data });

			loadUser();
		} catch (err) {
			dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
		}
	};

	// Login User
	const login = async formdata => {
		const config = {
			headers: {
				'Context-Type': 'application/json'
			}
		};

		try {
			const res = await axios.post('/api/v1/auth', formdata, config);

			dispatch({ type: LOGIN_SUCCESS, payload: res.data });

			loadUser();
		} catch (err) {
			dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
		}
	};

	// Logout
	const logout = () => dispatch({ type: LOGOUT });

	// Clear Errors
	const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error,
				register,
				loadUser,
				login,
				clearErrors,
				logout
			}}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
