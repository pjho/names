import { h, Component } from 'preact'
import { CanvasBarChart } from './canvas-bar'

export class BarChart extends Component {
  constructor(props) {
    super(props)
    this.canvasRef = null
  }

  componentDidMount(x) {
    const { data, height=20, barWidth=1, gutter=0, color='#E67E22' } = this.props

    Promise.resolve(0).then(() => {
      new CanvasBarChart({
        canvas:this.canvasRef,
        data,
        colors:[ color ],
        height,
        barWidth,
        gutter,
        gridScale:100,
        seriesName:"",
        padding:0,
        gridColor:"#eeeeee",
      })
    })

  }

  render () {
    return (
      <canvas ref={ (el) => this.canvasRef = el } />
    )
  }

}

