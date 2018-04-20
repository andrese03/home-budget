import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class ExpenseForm extends Component {

	constructor(props) {
		super(props);
		
		// State Definitions
		this.state = this.props.expense || { createdAt: '', amount: '', description: '', };

		// Bindings
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);		
	}

	onChange(event) {
		this.setState({[event.target.name]: event.target.value });
	}

	onSubmit(event) {
		event.preventDefault();
		const { createdAt, amount, description } = this.state;
		this.props.createExpense({ createdAt, amount, description });
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		
		// Reset the Form
		if (nextProps.expense == null) {
			return { ...prevState, createdAt: '', amount: '', description: '' };
		}

		// Load the Expense
		if (nextProps.expense != null) {
			nextProps.expense.createdAt = moment(nextProps.expense.createdAt).format('YYYY-MM-DD');
			return { ...prevState, ...nextProps.expense };
		}

		return prevState;
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
	createExpense: PropTypes.func,
	loadingExpense: PropTypes.bool,
	expense: PropTypes.object,
	errorExpense: PropTypes.any
}

ExpenseForm.defaultProps = {
	expense: null,
	loadingExpense: false,
	errorExpense: null
}

export default ExpenseForm;