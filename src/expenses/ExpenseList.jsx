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

	onClickExpense(e) {
		const expense = this.props.expenses.find(ex => ex._id === e.target.id);
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

		// Sucess
		return (
			<ul>
				{this.props.expenses.map((i, index) => (
					<li key={i._id} id={i._id} onClick={this.onClickExpense} >Description: {i.description} </li>
				))}
			</ul>
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