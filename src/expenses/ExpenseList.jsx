import React, { Component } from 'react';
import axios from 'axios';

class ExpenseList extends Component {

	constructor() {
		super();

		this.state = {
			isLoading: false,
			hasFailure: false,
			expenses: []
		}
		
		this.fetchData = this.fetchData.bind(this);
	}

	componentDidMount() {
		this.fetchData();
		const _this = this;
		setTimeout(() => {
			_this.props.a = 3;
		})
	}

	async fetchData() {
		const _this = this;

		_this.setState({isLoading: true});

		let response = await axios.get('http://localhost:3000/api/v1/movements');

		_this.setState({expenses: response.data.payload})

		_this.setState({isLoading: false});
	}

	render() {

		console.log(this.props)

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