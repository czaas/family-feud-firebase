import React from 'react';

export class ShowQuestions extends React.Component {


	render() {
		let questions = this.props.questions.map((item) => {
			return <li key={item.id}><a onClick={this.props.newCurrentQuestion.bind(this, item)}>{item.q}</a> <a onClick={this.props.handleDelete.bind(this, item)} className='delete'>[delete]</a></li>
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
