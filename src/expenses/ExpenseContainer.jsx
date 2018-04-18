import React,  { Component, Fragment } from 'react';
import axios from 'axios';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import Store from '../Store';

class ExpenseContainer extends Component {

	constructor(props) {
		super(props);
		this.createExpense = this.createExpense.bind(this);
		this._onCreateExpense = Store.addListener('EXPENSE_FORM_CREATE', this.createExpense);
	}

	async createExpense(expense) {
		console.log(expense);
		Store.emit('EXPENSE_FORM_RESET', null);
		let response = await axios({
			method: 'post',
			url: '/api/v1/movement',
			data: expense
		});
		console.log(response.data);
		Store.emit('EXPENSES_FETCH_DATA', null);
	}

	render() {
		return (
			<Fragment>
				<h1>Gastos <small>Registre los gastos que hace día a día</small></h1>
				<ExpenseForm onSubmit={this.createExpense}></ExpenseForm>
				<h1>Listado de Gastos<small> No tengas verguenza, ya lo hiciste</small></h1>
				<ExpenseList></ExpenseList>
			</Fragment>
		)
	}

}

export default ExpenseContainer;