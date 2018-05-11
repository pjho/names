import { h, Component } from "preact";
import style from "./style";
import { Link } from 'preact-router/match';
import { BarChart } from '../barchart';
import { observer, inject } from "mobx-preact";
import { Icon } from "../icon";


@inject('nameStore')
@observer
export class Name extends Component {

  render({ name, data, color, nameStore }) {

    return (
      <li class={ style.listname }>
        <Link href={`/n/${ name }`}>
          <div>
            { name }
            <BarChart data={ data.years } color={ color } />
          </div>
        </Link>
        <div class={style.actions}>
        { nameStore.isFave(name) ? (
          <a onClick={ () => nameStore.unFave(name) }>
            <Icon icon='heart' />
          </a>
        ) : (
          <a onClick={ () => nameStore.fave(name) }>
            <Icon icon='heartEmpty' />
          </a>
        )  }
        </div>
      </li>
    )
  }
}
