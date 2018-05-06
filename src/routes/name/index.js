import { h, Component } from 'preact'
import style from './style'

import { BarChart } from '../../components/barchart'
import { observer, inject } from "mobx-preact";


class NameStats extends Component {
  render({ data, title }) {
    return (
      <div>
        <h2>{ title }</h2>
        <BarChart
          data={ data.years }
          height={ 200 }
          barWidth={ 5 }
          gutter={ 1 }
        />
      </div>
    )
  }
}

@inject('nameStore')
@observer
export default class Name extends Component {

  render({ name, nameStore }, { query }) {

    const boyData = nameStore.male[name]
    const girlData = nameStore.female[name]

    return (
      <div class={ style.name }>

      <h1>{name}</h1>
      { girlData && (
          <NameStats
            data={ girlData }
            title={`Girls named ${ name }`}
          />
      ) }

      { boyData && (
          <NameStats
            data={ boyData }
            title={`Boys named ${ name }`}
          />
      ) }
      </div>
    )
  }
}
