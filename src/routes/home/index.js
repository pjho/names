import { h, Component } from 'preact'
import { NameList } from '../../components/namelist'
import style from './style'

export default class Home extends Component {
  state = {
    query: '',
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({ query: e.target.value })
  }

  render({ data }, { query }) {
    return (
      <div class={ style.home }>
        <input type='text' onInput={ this.handleChange } />
        <p>{query}</p>

        { query && (
          <NameList query={ query } data={ data } />
        )}
      </div>
    )
  }
}
