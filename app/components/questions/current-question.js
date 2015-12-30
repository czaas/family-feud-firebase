import React from 'react';

export class CurrentQuestion extends React.Component {

	render() {
		let currentQuestion = this.props.questions.map((q) => {
			if(q.currentQuestion === true){
				return <p key={q.id}>{q.q}</p>;
			}
		});

		return (
			<div>
				<h3>Current Question: </h3>
				{currentQuestion}
			</div>
		);
	}
}
