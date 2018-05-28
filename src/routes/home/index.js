import { h, Component } from 'preact'
import { NameList } from '../../components/namelist'
import { FavouritesList } from '../../components/favouriteslist'
import style from './style'

import { observer, inject } from "mobx-preact";


@inject('nameStore')
@observer
export default class Home extends Component {

  handleChange = (e) => {
    e.preventDefault()
    this.props.nameStore.query = e.target.value
  }

  componentDidMount() {
    this.inputRef.focus()
  }

  render({ nameStore }, { query }) {

    return (
      <div class={ style.home }>
        <div class='grid'>
          <div class='c10'>
            <div class={ style['search-container'] }>
              <input
                type='search'
                onInput={ this.handleChange }
                placeholder='Search for names...'
                ref={el => this.inputRef = el}
              />
            </div>
            <NameList />
          </div>

          <div class='c2'>
            <FavouritesList />
          </div>
        </div>
      </div>
    )
  }
}
