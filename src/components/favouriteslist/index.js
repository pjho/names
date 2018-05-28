import { h, Component } from "preact";
import style from "./style";

import { observer, inject } from "mobx-preact";


const NameListName = ({ name, nameStore}) => {
  return (
    <li>
      <span>{ name }</span>
      <a onclick={ () => nameStore.unFave(name) }>x </a>
    </li>
  )
}


@inject('nameStore')
@observer
export class FavouritesList extends Component {
  state = {};

  render({ nameStore }, _) {

    return (
      <div class={ style.favlist }>
        <h4>My Favorites</h4>
        <ul>
          { nameStore.favourites.map(name => <NameListName name={name} nameStore={nameStore} />) }
        </ul>
      </div>
    )

  }
}
