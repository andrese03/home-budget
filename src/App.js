import React, { Component } from 'react';

import ExpenseContainer from './expenses/ExpenseContainer';

import 'bootstrap3/dist/css/bootstrap.css';

class App extends Component {
	state = {
		response: ''
	};

	componentDidMount() {
		this.callApi()
			.then(res => this.setState({ response: res.express }))
			.catch(err => console.log(err));
	}

	callApi = async () => {
		const response = await fetch('/api/hello');
		const body = await response.json();

		if (response.status !== 200) throw Error(body.message);

		return body;
	};

	render() {
		return (
			<div className="container">
				<ExpenseContainer></ExpenseContainer>
			</div>
		);
	}
}

export default App;