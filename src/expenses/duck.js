import axios from 'axios';

export const EXPENSES_FETCH = 'EXPENSES_FETCH';
export const EXPENSES_FETCH_SUCCESS = 'EXPENSES_FETCH_SUCCESS';
export const EXPENSES_FETCH_FAILURE = 'EXPENSES_FETCH_FAILURE';

export const EXPENSE_RESET = 'EXPENSE_RESET';

export const EXPENSE_SELECT = 'EXPENSE_SELECT';

export const EXPENSE_FETCH = 'EXPENSE_FETCH';
export const EXPENSE_FETCH_SUCCESS = 'EXPENSE_FETCH_SUCCESS';
export const EXPENSE_FETCH_FAILURE= 'EXPENSE_FETCH_FAILURE';

export const EXPENSE_CREATE = 'EXPENSE_CREATE';
export const EXPENSE_CREATE_SUCCESS = 'EXPENSE_CREATE_SUCCESS';
export const EXPENSE_CREATE_FAILURE = 'EXPENSE_CREATE_FAILURE';

// Expenses Area
const fetchExpensesRequest = () => ({
	type: EXPENSES_FETCH
})

export const fetchExpensesSuccess = (data) => ({
	type: EXPENSES_FETCH_SUCCESS,
	data
})

export const fetchExpensesFailure = (error) => ({
	type: EXPENSES_FETCH_FAILURE,
	error
});

export const fetchExpenses = (options) => async (dispatch) => {
	dispatch(fetchExpensesRequest());
	try {
		let result = await axios.get('/api/v1/movements');
		result = result.data.payload;
		dispatch(fetchExpensesSuccess(result));
	} catch (error) {
		dispatch(fetchExpensesFailure(error.response.data));
	}
}

// Expense Area
export const createExpenseRequest = () => ({
	type: EXPENSE_CREATE
})

export const createExpenseSuccess = (data) => ({
	type: EXPENSE_CREATE_SUCCESS,
	data
})

export const createExpenseFailure = (error) => ({
	type: EXPENSE_CREATE_FAILURE,
	error
})

export const resetExpense = () => ({
	type: EXPENSE_RESET
})

export const selectExpense = (data) => ({
	type: EXPENSE_SELECT,
	data
})

export const createExpense = (expense) => async (dispatch) => {
	dispatch(createExpenseRequest());
	try {
		let result = await axios.post('/api/v1/movement', expense );
		result = result.data.payload;
		dispatch(createExpenseSuccess(result));
		dispatch(resetExpense());
		dispatch(fetchExpenses());
	} catch (error) {
		dispatch(createExpenseFailure(error.response.data));
	}
}

export const expensesReducer = (state = { expenses: [], loadingExpenses: false, errorExpenses: false, expense: null, loadingExpense: false }, action) => {
	switch (action.type) {
		case EXPENSES_FETCH:
			return { ...state, loadingExpenses: true, expenses: [], errorExpenses: false };
		case EXPENSES_FETCH_SUCCESS:
			return { ...state, loadingExpenses: false, expenses: action.data };
		case EXPENSES_FETCH_FAILURE:
			return { ...state, loadingExpenses: true, errorExpenses: true };
		case EXPENSE_CREATE:
			return { ...state, loadingExpense: true, errorExpense: false };
		case EXPENSE_CREATE_SUCCESS:
			return { ...state, loadingExpense: false, expense: action.data }
		case EXPENSE_SELECT:
			return { ...state, expense: action.data }
		case EXPENSE_RESET:
			return { ...state, resetExpense: true, expense: null }
		default:
			return state;
	}
}