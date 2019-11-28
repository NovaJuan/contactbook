import React, { useReducer } from 'react';
import axios from 'axios';
import Context from './context';
import Reducer from './reducer';
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
	CONTACT_ERROR,
	GET_CONTACTS,
	CLEAR_CONTACTS
} from '../types';

const State = props => {
	const initialState = {
		contacts: null,
		current: null,
		filtered: null,
		error: null
	};

	const [state, dispatch] = useReducer(Reducer, initialState);

	// Get contacts
	const getContacts = async () => {
		try {
			const res = await axios.get('/api/v1/contacts');
			dispatch({ type: GET_CONTACTS, payload: res.data.data });
		} catch (err) {
			dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
		}
	};

	// Add contact
	const addContact = async contact => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		try {
			const res = await axios.post('/api/v1/contacts', contact, config);
			dispatch({ type: ADD_CONTACT, payload: res.data.data });
		} catch (err) {
			dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
		}
	};

	// Delete contact
	const deleteContact = async id => {
		try {
			await axios.delete(`/api/v1/contacts/${id}`);
			dispatch({ type: DELETE_CONTACT, payload: id });
		} catch (err) {}
	};

	// Update contact
	const updateContact = async contact => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		try {
			const res = await axios.put(
				`/api/v1/contacts/${contact._id}`,
				contact,
				config
			);
			dispatch({ type: UPDATE_CONTACT, payload: res.data.data });
		} catch (err) {
			dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
		}
	};

	// Set current contact
	const setCurrent = contact => {
		dispatch({ type: SET_CURRENT, payload: contact });
	};

	// Clear current contact
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	};

	// Filter Contacts
	const filterContacts = text => {
		dispatch({ type: FILTER_CONTACTS, payload: text });
	};

	// Clear Filters
	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER });
	};

	// Clear contacts
	const clearContacts = () => dispatch({ type: CLEAR_CONTACTS });

	return (
		<Context.Provider
			value={{
				contacts: state.contacts,
				getContacts,
				addContact,
				deleteContact,
				updateContact,
				clearContacts,
				current: state.current,
				setCurrent,
				clearCurrent,
				filtered: state.filtered,
				filterContacts,
				clearFilter,
				error: state.error
			}}>
			{props.children}
		</Context.Provider>
	);
};

export default State;
