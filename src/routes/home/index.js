import { h, Component } from 'preact';
import style from './style';

export default class Home extends Component {
	render(state, props) {

    console.log(props);


		return (
			<div class={style.home}>
				<h1>Home</h1>
				<p>This is the Home component.</p>
			</div>
		);
	}
}
