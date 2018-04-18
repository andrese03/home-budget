import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class ExpenseForm extends Component {

	constructor() {
		super();

		this.state = {
			expense: {
				createdAt: '',
				amount: '',
				description: '',
			},
		}

		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	onChange(event) {
		this.setState({[event.target.name]: event.target.value });
	}

	onSubmit(event) {
		event.preventDefault();
		this.props.onSubmit(event);
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