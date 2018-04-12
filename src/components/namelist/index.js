import { h, Component } from "preact";
import style from "./style";

export class NameList extends Component {
  state = {};

  render({ query, data }, _) {
    const startsWithQuery = name => name.toLowerCase().startsWith(query.toLowerCase())
    const boyNames = data.names.male.filter(startsWithQuery)
    const girlNames = data.names.female.filter(startsWithQuery)

    return (
      <div class={ style.namelist }>
        { girlNames.length > 0 && (
          <div>
            <h4>{girlNames.length} Girls Names</h4>
            <ul>
              { girlNames.map(name => <li>{name}</li>) }
            </ul>
          </div>
        )}

        { boyNames.length > 0 && (
          <div>
            <h4>{boyNames.length} Boys Names</h4>
            <ul>
              { boyNames.map(name => <li>{name}</li>) }
            </ul>
          </div>
        )}
      </div>
    )
  }
}
