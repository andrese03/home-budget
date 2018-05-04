import React,  { Component, Fragment } from 'react';
import Icon from '@fortawesome/react-fontawesome'
import ExpenseForm from './ExpenseFormContainer';
import ExpenseList from './ExpenseListContainer';

class ExpenseContainer extends Component {

	render() {
		return (
			<Fragment>
				<h1><Icon icon="coffee" /> Gastos <small>Registre los gastos que hace día a día</small></h1>
				<ExpenseForm onSubmit={this.createExpense}></ExpenseForm>
				<h1>Listado de Gastos<small> No tengas verguenza, ya lo hiciste</small></h1>
				<ExpenseList></ExpenseList>
			</Fragment>
		)
	}

}

export default ExpenseContainer;