import React from 'react';
import Rebase from 're-base';
import _ from 'lodash';

import { AddQuestion } from './questions/add-question-form.js';
import { ShowQuestions } from './questions/show-questions.js';

let base = Rebase.createClass('https://family-feud-v2.firebaseio.com');

export class Host extends React.Component {

	constructor(){
		super();

		this.handleAddQuestion = this.handleAddQuestion.bind(this);
		this.handleDeleteQuestion = this.handleDeleteQuestion.bind(this);
		this.state = {
			game: []
		};

	}

	componentDidMount(){
		base.syncState( 'games/test', {
			context: this,
			state: 'game',
			asArray: true,
		});
	}

	handleAddQuestion(newQuestion){

		this.setState({
			game: this.state.game.concat([newQuestion])
		});
	}

	handleDeleteQuestion(question){
	
		var newGame = _.remove(this.state.game, (q) => {
			if(q.id !== question.id){
				return q;
			}
		});

		this.setState({
			game: newGame
		});
	}

	render() {

		return (
			<div>
				<h1>Hello world</h1>

				<AddQuestion handleForm={this.handleAddQuestion} />
				<ShowQuestions questions={this.state.game} handleDelete={this.handleDeleteQuestion} />
				
			</div>
		);
	}
}