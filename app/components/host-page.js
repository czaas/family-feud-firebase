import React from 'react';
import Rebase from 're-base';
import _ from 'lodash';

import { AddQuestion } from './questions/add-question-form.js';
import { ShowQuestions } from './questions/show-questions.js';
import { CurrentQuestion } from './questions/current-question.js';

let base = Rebase.createClass('https://family-feud-v2.firebaseio.com');

export class Host extends React.Component {

	constructor(){
		super();

		this.handleAddQuestion = this.handleAddQuestion.bind(this);
		this.handleDeleteQuestion = this.handleDeleteQuestion.bind(this);
		this.updateCurrentQuestion = this.updateCurrentQuestion.bind(this);
		this.state = {
			game: []
		};
	}

	componentDidMount(){
		this.ref = base.syncState( 'games/test', {
			context: this,
			state: 'game',
			asArray: true,
		});
	}

	componentWillUnmount(){
		base.removeBinding(this.ref);
	}

	handleAddQuestion(newQuestion){

		var games = _.clone(this.state.game);

		games.map((game)=>{
			game.currentQuestion = false;
		});

		newQuestion.currentQuestion = true;

		this.setState({
			game: games.concat([newQuestion])
		});
	}

	updateCurrentQuestion(question){
		var games = _.clone(this.state.game);

		games.map((q) => {
			if(q.id === question.id){
				q.currentQuestion = true;
			} else {
				q.currentQuestion = false;
			}
		});

		this.setState({
			game: games
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
				<h2>Host</h2>

				<AddQuestion handleForm={this.handleAddQuestion} />
				<ShowQuestions questions={this.state.game} handleDelete={this.handleDeleteQuestion} newCurrentQuestion={this.updateCurrentQuestion} />
				<CurrentQuestion questions={this.state.game} />
			</div>
		);
	}
}