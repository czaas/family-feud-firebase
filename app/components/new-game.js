import React from 'react';
import Rebase from 're-base';
import $ from 'npm-zepto';
import _ from 'lodash';

let base = Rebase.createClass('https://family-feud-v2.firebaseio.com');

export class NewGame extends React.Component {

	constructor() {
		super();
		this.componentDidMount = this.componentDidMount.bind(this);
		this.componentWillUnmount = this.componentWillUnmount.bind(this);
		this.startGame = this.startGame.bind(this);

		this.state = {
			vs: []
		};
	}

	componentDidMount(){

		let gameId = createGameId();

		this.ref = base.syncState( 'games/game-' + gameId, {
			context: this,
			state: 'vs', // teamA vs teamB
			asArray: true,
		});
	}

	componentWillUnmount(){
		base.removeBinding(this.ref);
	}

	startGame(){

		let gameTemplate = [{
			gameName: 'Family Fued',
			questions: [],

			gameState: {

				currentPoints: 0,
				currentQuestionIndex: 0,

				teamA: {
					points: 0,
					teamName: 'Team A'
				},
				teamB: {
					points: 0,
					teamName: 'Team B'
				}
			}
		}];

		$.getJSON('https://family-feud-v2.firebaseio.com/games/all-questions.json', (data) => {

			gameTemplate.questions = data;

			this.setState({
				vs: gameTemplate
			});
		});
	}


	render() {
		
		return (
			<div>
				<h2>New game</h2>

				<strong onClick={this.startGame}>Start Game</strong>
			</div>
		);
	}
}


// Game ID is 4 digit random number that will be shared with the audience
function createGameId(){
	var newId = Math.floor(Math.random() * 9999);

	if(newId.toString().length <= 3) {
		return createGameId();
	} else {
		return newId;
	}
}