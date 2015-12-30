import React from 'react';

export class ShowAnswers extends React.Component {

	render() {

		let answers = this.props.questions.map((q, i) => {
			if (q.currentQuestion && q.answers) {
				return q.answers.map((a) => {
					if (a) {
						var classNames = (a.isVisiable) ? 'visible' : '';
						return <li key={q.id + a.id} className={classNames}><a onClick={this.props.toggleVisibility.bind(this, a)}>{a.answer}, {a.points}</a> <a onClick={this.props.handleDelete.bind(this, a)}>[x]</a></li>;
					}
				});
			}
		});

		return (
			<div>
				<h3>Answers</h3>
				<ul>
				{answers}
				</ul>
			</div>
		);
	}
}
