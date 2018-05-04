import { h, Component } from "preact";
import style from "./style";
import { Link } from 'preact-router/match';
import { BarChart } from '../barchart';

const girlColor = '#8E44AD';
const boyColor = '#34495E';

const Name = ({ name, data, color }) => (
    <li>
      <Link href={`/n/${ name }`}>
        <div>
          { name }
          <BarChart data={ data.years } color={ color } />
        </div>
      </Link>
        <div class={style.actions}>
          save
        </div>
    </li>
  )

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
              { girlNames.map(name => (
                <Name
                  key={ name }
                  name={name}
                  data={ data.female[name] }
                  color={ girlColor }
                />
              ))}
            </ul>
          </div>
        )}

        { boyNames.length > 0 && (
          <div>
            <h4>{boyNames.length} Boys Names</h4>
            <ul>
              { boyNames.map(name => (
                <Name
                  key={ name }
                  name={name}
                  data={ data.male[name] }
                  color={ boyColor }
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}
