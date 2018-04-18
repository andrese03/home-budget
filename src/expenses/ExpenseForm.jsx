import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Store from '../Store';

class ExpenseForm extends Component {

	// State Definitions
	state = {
		createdAt: '',
		amount: '',
		description: '',
	}

	listeners = []

	constructor(props) {
		super(props);

		// Bindings
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.clearForm = this.clearForm.bind(this);

		// Event Listeners
		this.addListeners();
	}

	componentWillUnmount() {
		this.listeners.forEach((l) => Store.removeListener(l));
	}

	addListeners() {
		this.listeners.push(Store.addListener('EXPENSE_FORM_RESET', this.clearForm));
	}

	onChange(event) {
		this.setState({[event.target.name]: event.target.value });
	}

	onSubmit(event) {
		event.preventDefault();
		Store.emit('EXPENSE_FORM_CREATE', this.state);
	}

	clearForm() {
		this.setState({
			createdAt: '',
			amount: '',
			description: '',
		});
	}

	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<div className="form-group">
					<label htmlFor="createdAt">Fecha</label>
					<input type="date" className="form-control" id="createdAt" name="createdAt" value={this.state.createdAt} onChange={this.onChange} autoFocus="true" required/>
				</div>
				<div className="form-group">
					<label htmlFor="amount">Monto</label>
					<input type="number" className="form-control" id="amount" name="amount" value={this.state.amount} onChange={this.onChange} placeholder="Ej. 256" required />
				</div>
				<div className="form-group">
					<label htmlFor="description">Descripción</label>
					<input type="text" className="form-control" id="description" name="description" value={this.state.description} onChange={this.onChange} placeholder="Ej. Comer pizza" required/>
				</div>
				<button type="submit" className="btn btn-primary">Agregar</button>
			</form>
		)
	}
}

ExpenseForm.propTypes = {
	onSubmit: PropTypes.func.isRequired
}

export default ExpenseForm;