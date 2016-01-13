import React from 'react';
import Rebase from 're-base';

import { ShowAnswersAudience } from './audience/answers.js';

let base = Rebase.createClass('https://family-feud-v2.firebaseio.com');

export class Audience extends React.Component {

	constructor(){
		super();

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


	render() {
		let currentAnswers = [];
		let currentQuestion = this.state.game.map((q) => {
			if(q.currentQuestion) {
					q.answers.map( a => currentAnswers.push(a));

					return <span key={q.id}>{q.q}</span>;
				} else {
					return null;
				}
		});

		return (
			<div>
				<h2>Audience</h2>
				<p>Current Question: {currentQuestion || 'No currentQuestion'}</p>
				<ShowAnswersAudience answers={currentAnswers} />
			</div>
		);
	}
}
