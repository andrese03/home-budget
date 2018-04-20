import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ExpenseList extends Component {

	constructor(props) {
		super(props);

		this.onClickExpense = this.onClickExpense.bind(this);
	}

	componentDidMount() {
		this.props.fetchExpenses();
	}

	onClickExpense(event, expense) {
		this.props.selectExpense(expense);
	}

	render() {
		// List Loading
		if (this.props.loadingExpenses) {
			return <p> Loading... </p>
		}

		// Error
		if (this.props.errorExpenses) {
			return <p>Sorry! There was an error loading the expenses</p>;
		}

		if (!this.props.expenses.length) {
			return <p> There's no expenses </p>
		}

		// Sucess
		return (
			<table className="table table-striped">
				<thead>
					<tr>
						<th>Descripción</th>
						<th>Monto</th>
						<th>Fecha</th>
					</tr>
				</thead>
				<tbody>
				{this.props.expenses.map((i, index) => (
					<tr key={i._id} id={i._id} onClick={e => this.onClickExpense(e, i)}>
						<td>{i.description}</td>
						<td>{i.amount}</td>
						<td>{i.createdAt}</td>
					</tr>
				))}
				</tbody>
			</table>
		)
	}
}

ExpenseList.propTypes = {
	fetchExpenses: PropTypes.func.isRequired,
	selectExpense: PropTypes.func.isRequired,
	expenses: PropTypes.array.isRequired,
	loadingExpenses: PropTypes.bool,
	errorExpenses: PropTypes.bool
}

ExpenseList.defaultProps = {
	expenses: [],
	loadingExpenses: true,
	errorExpenses: false
};

export default ExpenseList;