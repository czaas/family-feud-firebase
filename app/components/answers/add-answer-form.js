import React from 'react';

export class AddAnswer extends React.Component {

	constructor(){
		super();
		this.handleForm = this.handleForm.bind(this);
	}

	handleForm(e){
		e.preventDefault();

		var newId = (+new Date() + Math.floor(Math.random() * 999999));

		var newAnswer = {
			answer: this.refs.answer.value,
			points: this.refs.points.value,
			id: newId
		};

		this.props.handleForm(newAnswer);
		this.refs.newAnswerForm.reset();

	}

	render() {
		return (
			<div>
				<h3>Add Answer</h3>
				<form onSubmit={this.handleForm} ref='newAnswerForm'>
					<input type='text' ref='answer' placeholder='New Answer' />
					<input type='number' ref='points' placeholder='Point value' />
					<button>Submit</button>
				</form>
			</div>
		);
	}
}
