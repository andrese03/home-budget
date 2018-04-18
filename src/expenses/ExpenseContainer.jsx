import React,  { Component, Fragment } from 'react';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';

class ExpenseContainer extends Component {

	constructor() {
		super();
		this.submitExpense = this.submitExpense.bind(this);
	}

	submitExpense(event, expense) {
		console.log(event, expense);
	}

	render() {
		return (
			<Fragment>
				<h1>Gastos <small>Registre los gastos que hace día a día</small></h1>
				<ExpenseForm onSubmit={this.submitExpense}></ExpenseForm>
				<h1>Listado de Gastos<small> No tengas verguenza, ya lo hiciste</small></h1>
				<ExpenseList a={1}></ExpenseList>
			</Fragment>
		)
	}

}

export default ExpenseContainer;