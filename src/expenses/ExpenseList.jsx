import React, { Component } from 'react';
import Store from '../Store';
import axios from 'axios';

class ExpenseList extends Component {

	state = {
		isLoading: false,
		hasFailure: false,
		expenses: []
	}

	constructor() {
		super();
		
		this.fetchData = this.fetchData.bind(this);
		
		this._onFetchDate = Store.addListener('EXPENSES_FETCH_DATA', this.fetchData);
	}

	componentDidMount() {
		this.fetchData();
	}

	async fetchData() {
		const _this = this;

		_this.setState({isLoading: true});

		let response = await axios.get('http://localhost:3000/api/v1/movements');

		_this.setState({expenses: response.data.payload})

		_this.setState({isLoading: false});
	}

	render() {

		// List Loading
		if (this.state.isLoading) {
			return <p> Loading... </p>
		}

		// Error
		if (this.state.hasFailure) {
			return <p>Sorry! There was an error loading the entries</p>;
		}

		// Sucess
		return (
			<ul>
				{this.props.a}
				{this.state.expenses.map((i, index) => (
					<li key={index}>Description: {i.description} </li>
				))}
			</ul>
		)
	}
}

export default ExpenseList;