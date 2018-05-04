
import { h, render, Component } from "preact";

// export default class App extends Component {
//   state = { todos: [], text: "" };
//   setText = e => {
//     this.setState({ text: e.target.value });
//   };
//   addTodo = () => {
//     let { todos, text } = this.state;
//     todos = todos.concat({ text });
//     this.setState({ todos, text: "" });
//   };
//   render({}, { todos, text }) {
//     return (
//       <form onSubmit={this.addTodo} action="javascript:">
//         <input value={text} onInput={this.setText} />
//         <button type="submit">Add</button>
//         <ul>{todos.map(todo => <li>{todo.text}</li>)}</ul>
//       </form>
//     );
//   }
// }

const x = document.getElementById("mount");
console.log(x);

render(<App />, x);