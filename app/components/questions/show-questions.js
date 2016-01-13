import React from 'react';

export class ShowQuestions extends React.Component {


	render() {
		let questions = this.props.questions.map((item) => {
			var classes = (item.currentQuestion) ? 'visible' : '';
			return <li key={item.id} className={classes}><a onClick={this.props.newCurrentQuestion.bind(this, item)}>{item.q}</a> <a onClick={this.props.handleDelete.bind(this, item)} className='delete'>[x]</a></li>
		});
		return (
			<div>
				<p><em>Current question will he highlighted <span className="visible">green</span></em></p>
				<ul>
					{questions}
				</ul>
			</div>
		);
	}
}
