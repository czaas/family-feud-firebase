import React from 'react';
import Rebase from 're-base';

let base = Rebase.createClass('https://family-feud-v2.firebaseio.com');

export class Audience extends React.Component {

	constructor(){
		super();

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


	render() {

		let currentQuestion = this.state.game.map((q) => {
			return (q.currentQuestion) ? 
				<span>{q.q}</span> :
				null;
		});

		return (
			<div>
				<h2>Audience</h2>
				<p>{currentQuestion || 'No currentQuestion'}</p>
			</div>
		);
	}
}
