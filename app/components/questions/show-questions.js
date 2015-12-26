import React from 'react';

export class ShowQuestions extends React.Component {


	render() {
		let questions = this.props.questions.map((item) => {
			return <li key={item.id}>{item.q}, <a onClick={this.props.handleDelete.bind(this, item)}>delete</a></li>
		});
		return (
			<div>
				<ul>
					{questions}
				</ul>
			</div>
		);
	}
}
