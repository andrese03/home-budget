import { combineReducers } from 'redux';

import { expensesReducer } from './expenses/duck';

export default combineReducers({
	expenses: expensesReducer
});