import { h, Component } from 'preact'




export const BarChart = ({ data, height=20, barWidth=1, gutter=0, color='#E67E22' }) => {
  const keys = Object.keys(data)
  const vals = Object.values(data)
  const chartWidth = keys.length * (barWidth + gutter);

  const min = Math.min(...vals)
  const max = Math.max(...vals)

  const scale = (n) => {
    return (height - 1) * (n - min) / (max-min) + 1
  }

  return (
    <svg width={ chartWidth } height={ height } >
      { keys.map((year ,i) => {
        const val = scale(data[year])
        return (
          <rect
            fill={ color }
            width={ barWidth }
            y={ height - val }
            x="0"
            height={ val }
            transform={ `translate(${ (barWidth + gutter) * i },0)` }
          />
        )
      } )}
    </svg>
  )
}
