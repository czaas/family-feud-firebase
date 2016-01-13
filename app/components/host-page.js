import React from 'react';
import Rebase from 're-base';
import _ from 'lodash';

import { AddQuestion } from './questions/add-question-form.js';
import { ShowQuestions } from './questions/show-questions.js';
import { AddAnswer } from './answers/add-answer-form.js';
import { ShowAnswers } from './answers/show-answers.js';
import { ResetGame } from './reset-game.js';

let base = Rebase.createClass('https://family-feud-v2.firebaseio.com');

export class Host extends React.Component {

	constructor(){
		super();

		this.handleAddQuestion = this.handleAddQuestion.bind(this);
		this.handleDeleteQuestion = this.handleDeleteQuestion.bind(this);
		this.updateCurrentQuestion = this.updateCurrentQuestion.bind(this);
		
		this.handleNewAnswer = this.handleNewAnswer.bind(this);
		this.toggleAnswerVisibility = this.toggleAnswerVisibility.bind(this);
		this.deleteAnswer = this.deleteAnswer.bind(this);

		this.handleReset = this.handleReset.bind(this);

		this.state = {
			game: []
		};
	}

	componentDidMount(){
		this.ref = base.syncState( 'games/all-questions', {
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

	toggleAnswerVisibility(answer){
		
		var games = _.clone(this.state.game);

		games.map((q) => {
			if(q.currentQuestion){
				var indexOfAnswer = _.findIndex(q.answers, function(a) {
					return a.id === answer.id;
				});

				q.answers[indexOfAnswer].isVisible = !q.answers[indexOfAnswer].isVisible;

				this.setState({
					game: games
				});
			}
		});
		
	}

	deleteAnswer(answer){
		
		var games = _.clone(this.state.game);

		games.map((q) => {
			if(q.currentQuestion){

				var arrOfAnswers = _.clone(q.answers);

				var newAnswers = _.remove(arrOfAnswers, (a) => {
					if(a.id !== answer.id){
						return a;
					}
				});

				q.answers = newAnswers;
				

				this.setState({
					game: games
				});
			}
		});
		
	}

	handleNewAnswer(answer){

		var games = _.clone(this.state.game);

		games.map((q) => {
			if(q.currentQuestion){
				if(_.isArray(q.answers)){
					q.answers.push(answer);
				} else {
					q.answers = [];
					q.answers.push(answer);
				}
			}
		});

		this.setState({
			game: games
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

	handleReset(){
		var games = _.clone(this.state.game);

		games.map((q) => {
			q.currentQuestion = false;

			q.answers.map( a => a.isVisible = false);
		});

		this.setState({
			game: games
		});
	}

	render() {

		return (
			<div>
				<h2>Host</h2>
				<a onClick={this.handleReset}>Reset Game</a>
				<AddQuestion handleForm={this.handleAddQuestion} />
				<ShowQuestions questions={this.state.game} handleDelete={this.handleDeleteQuestion} newCurrentQuestion={this.updateCurrentQuestion} />
				<AddAnswer handleForm={this.handleNewAnswer} />
				<ShowAnswers questions={this.state.game} toggleVisibility={this.toggleAnswerVisibility} handleDelete={this.deleteAnswer} />
			</div>
		);
	}
}