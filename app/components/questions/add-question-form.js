import React from 'react';

export class AddQuestion extends React.Component {

	constructor(){
		super();
		this.handleForm = this.handleForm.bind(this);
	}

	handleForm(e){
		e.preventDefault();
		
		var newId = (+new Date() + Math.floor(Math.random() * 999999));

		var newItem = {
			q: this.refs.name.value,
			id: newId
		};

		this.props.handleForm(newItem);

		this.refs.newQuestionForm.reset();
	}

	render() {
		return (
			<form onSubmit={this.handleForm} ref='newQuestionForm'>
				<input type='text' ref='name' placeholder='New Question' />
				<button>Submit</button>
			</form>
		);
	}
}