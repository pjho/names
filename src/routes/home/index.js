import { h, Component } from 'preact'
import { NameList } from '../../components/namelist'
import style from './style'

import { observer, inject } from "mobx-preact";


@inject('nameStore')
@observer
export default class Home extends Component {

  handleChange = (e) => {
    e.preventDefault()
    this.props.nameStore.query = e.target.value
  }

  render({ data, nameStore }, { query }) {

    return (
      <div class={ style.home }>

        <div class={ style['search-container'] }>
          <input
            type='search'
            onInput={ this.handleChange }
            placeholder='Search for names...'
            autofocus
          />
        </div>

        { nameStore.query && (
          <NameList query={ nameStore.query } data={ data } />
        )}
      </div>
    )
  }
}
