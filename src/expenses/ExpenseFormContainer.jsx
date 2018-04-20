import { connect } from 'react-redux';
import { createExpense } from './duck';
import ExpenseForm from './ExpenseForm';

const mapStateToProps = ({ expenses }) => ({
	expense: expenses.expense,
	loadingExpense: expenses.loadingExpense,
	errorExpense: expenses.errorExpense
})

const mapDispatchToProps = (dispatch) => ({
	createExpense: (expense) => dispatch(createExpense(expense))
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);