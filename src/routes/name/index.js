import { h, Component } from 'preact'
import style from './style'


// { Object.keys(data.years).map(year => (
//   <p>{`${ year } - ${ data.years[year] }`}</p>
// ))}



class Chart extends Component {
  render({ data }) {
    const keys = Object.keys(data)
    const barWidth = 5;
    const gutter = 1;
    const chartWidth = keys.length * (barWidth + gutter);
    const chartHeight = 220;
    return (
      <svg width={ chartWidth } height={ chartHeight } style={{border:'1px dashed orange'}}>
        { keys.map((year ,i) => {
          const val = data[year]
          return (
            <rect
              width={ barWidth }
              y={chartHeight - val}
              x="0"
              height={val}
              transform={`translate(${(barWidth + gutter) * i},0)`}
            />
          )
        } )}
      </svg>
    )
  }
}




class NameStats extends Component {
  render({ data, title }) {

    const startYear = 1900
    const endYear = 2017
    const allYears = {}
    for (let i = startYear; i <= endYear; i++) {
      allYears[i] = data.years[i] || 0
    }

    return (
      <div>
        <h2>{ title }</h2>
        <Chart data={ allYears } />
      </div>
    )
  }
}



export default class Name extends Component {

  render({ data, name }, { query }) {

    const boyData = data.male[name]
    const girlData = data.female[name]

    return (
      <div class={ style.name }>

      <h1>{name}</h1>
      { girlData && (
          <NameStats data={ girlData } title={`Girls named ${ name }`} />
      ) }

      { boyData && (
          <NameStats data={ boyData } title={`Boys named ${ name }`} />
      ) }
      </div>
    )
  }
}
