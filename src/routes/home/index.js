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
        <div class={ style['search-container'] }>
          <input type='search' onInput={ this.handleChange } placeholder='Search for names...' />
        </div>

        { query && (
          <NameList query={ query } data={ data } />
        )}
      </div>
    )
  }
}
