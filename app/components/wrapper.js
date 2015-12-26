import React from 'react';
import { Link } from 'react-router';

export class Wrapper extends React.Component {
	render() {
		return (
			<div>
				<h1>Family Feud</h1>
				<nav><Link to='/'>Audience</Link> <Link to='/host'>Host</Link></nav>
				<div>{this.props.children}</div>
			</div>
		);
	}
}
