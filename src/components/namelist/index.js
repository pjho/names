import { h, Component } from "preact";
import style from "./style";
import { Link } from 'preact-router/match';
import { BarChart } from '../barchart';
import { observer, inject } from "mobx-preact";
import { Name } from "../name";

const girlColor = '#8E44AD';
const boyColor = '#34495E';

@inject('nameStore')
@observer
export class NameList extends Component {
  state = {};

  render({ nameStore }, _) {
    if (!nameStore.query) { return null }

    const boyList = nameStore.maleList
    const girlList = nameStore.femaleList

    return (
      <div class={ style.namelist }>

        { boyList.length > 0 && (
          <div>
            <h4>{boyList.length} Boys Names</h4>
            <ul>
              { boyList.map(name => (
                <Name
                  key={ name }
                  name={ name }
                  data={ nameStore.male[name] }
                  color={ boyColor }
                />
              ))}
            </ul>
          </div>
        ) }

        { girlList.length > 0 && (
          <div>
            <h4>{girlList.length} Girls Names starting with "{ nameStore.query }"</h4>
            <ul>
              { girlList.map(name => (
                <Name
                  key={ name }
                  name={ name }
                  data={ nameStore.female[name] }
                  color={ girlColor }
                />
              ))}
            </ul>
          </div>
        )}

      </div>
    )
  }
}
