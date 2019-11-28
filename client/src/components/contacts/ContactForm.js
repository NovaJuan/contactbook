import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../contexts/Contact/context';

const ContactForm = () => {
	const [contact, setContact] = useState({
		name: '',
		email: '',
		phone: '',
		type: 'Personal'
	});

	const { name, email, phone, type } = contact;

	const contactContext = useContext(ContactContext);
	const { addContact, current, clearCurrent, updateContact } = contactContext;

	useEffect(() => {
		if (current !== null) {
			setContact(current);
		} else {
			setContact({
				name: '',
				email: '',
				phone: '',
				type: 'Personal'
			});
		}
	}, [contactContext, current]);

	const onChange = e =>
		setContact({ ...contact, [e.target.name]: e.target.value });

	const clearAll = () => {
		clearCurrent();
		setContact({
			name: '',
			email: '',
			phone: '',
			type: 'Personal'
		});
	};

	const onSubmit = e => {
		e.preventDefault();
		if (current === null) {
			addContact(contact);
		} else {
			updateContact(contact);
		}
		clearCurrent();
		setContact({
			name: '',
			email: '',
			phone: '',
			type: 'Personal'
		});
	};

	return (
		<form onSubmit={onSubmit}>
			<h2 className='text-primary'>
				{current ? 'Update Contact' : 'Add Contact'}
			</h2>
			<input
				type='text'
				name='name'
				placeholder='Name'
				value={name}
				onChange={onChange}
			/>
			<input
				type='text'
				name='email'
				placeholder='Email'
				value={email}
				onChange={onChange}
			/>
			<input
				type='text'
				name='phone'
				placeholder='Phone'
				value={phone}
				onChange={onChange}
			/>
			<h5>Contact type:</h5>
			<input
				type='radio'
				name='type'
				value='Personal'
				onChange={onChange}
				checked={type === 'Personal'}
			/>{' '}
			Personal{' '}
			<input
				type='radio'
				name='type'
				value='Professional'
				onChange={onChange}
				checked={type === 'Professional'}
			/>{' '}
			Professional{' '}
			<div>
				<input
					type='submit'
					value={current ? 'Update Contact' : 'Add Contact'}
					className='btn btn-primary btn-block'
				/>
			</div>
			{current && (
				<div>
					<button className='btn btn-white btn-block' onClick={clearAll}>
						Clear
					</button>
				</div>
			)}
		</form>
	);
};

export default ContactForm;
