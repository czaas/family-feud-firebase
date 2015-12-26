import React from 'react';

export class CurrentQuestion extends React.Component {

	render() {
		let currentQuestion = this.props.questions.map((q) => {
			if(q.currentQuestion === true){
				return <p>{q.q}</p>;
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
