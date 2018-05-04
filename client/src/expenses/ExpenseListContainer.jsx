import { connect } from 'react-redux';
import { fetchExpenses, selectExpense } from './duck';
import ExpenseList from './ExpenseList';

const mapStateToProps = ({ expenses }) => ({
	expenses: expenses.expenses,
	loadingExpenses: expenses.loadingExpenses,
	errorExpenses: expenses.errorExpenses
})

const mapDispatchToProps = (dispatch) => ({
	fetchExpenses: () => dispatch(fetchExpenses()),
	selectExpense: (expense) => dispatch(selectExpense(expense)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);