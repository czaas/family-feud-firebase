import React from 'react';

export class ShowAnswersAudience extends React.Component {
	render() {

		let answers = this.props.answers.map( (a) => {
			if(a.isVisible){
				return <p>{a.answer}, {a.points}</p>;
			} else {
				return <p>Hidden, Hidden</p>;
			}
		});

		return (
			<div>
				{answers}
			</div>
		);
	}
}
