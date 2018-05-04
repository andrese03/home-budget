import React, { Component } from 'react';

import ExpenseContainer from './expenses/ExpenseContainer';

import 'bootstrap3/dist/css/bootstrap.css';
import fontawesome from '@fortawesome/fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
import solid from '@fortawesome/fontawesome-free-solid'

fontawesome.library.add(brands, solid);;

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