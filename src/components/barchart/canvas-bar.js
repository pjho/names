
function drawLine(ctx, startX, startY, endX, endY,color){
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX,startY);
    ctx.lineTo(endX,endY);
    ctx.stroke();
    ctx.restore();
}

function drawBar(ctx, topX, topY, width, height, color){
    ctx.save();
    ctx.fillStyle=color;
    ctx.fillRect(topX,topY,width,height);
    ctx.restore();
}


export const CanvasBarChart = function({ data, canvas, colors, ...options }){
    this.data = data;
    this.options = options;

    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = colors;

    const vals = Object.values(data);
    this.barCount = vals.length;
    this.minVal = Math.min(...vals);
    this.maxVal = Math.max(...vals);
    this.chartHeight = this.options.height;
    this.chartWidth = this.barCount * (this.options.barWidth + this.options.gutter);

    this.canvasActualWidth = this.chartWidth + this.options.padding * 2;
    this.canvasActualHeight = this.chartHeight - this.options.padding * 2;



    this.draw();
}

CanvasBarChart.prototype.scale = function(n) {
  return this.chartHeight * (n - this.minVal) / (this.maxVal - this.minVal)
}

CanvasBarChart.prototype.drawGrid = function() {
    // drawing the grid lines
    var gridValue = 0;
    while (gridValue <= this.maxValue){
        var gridY = this.canvasActualHeight * (1 - gridValue/this.maxValue) + this.options.padding;
        drawLine(this.ctx, 0, gridY, this.canvas.width, gridY, this.options.gridColor );

        //writing grid markers
        this.ctx.save();
        this.ctx.fillStyle = this.options.gridColor;
        this.ctx.textBaseline="bottom";
        this.ctx.font = "bold 10px Arial";
        this.ctx.fillText(gridValue, 10,gridY - 2);
        this.ctx.restore();

        gridValue+=this.options.gridScale;
    }
}

CanvasBarChart.prototype.drawBars = function() {
    //drawing the bars
    let i = 0;

    const { barWidth, gutter, padding } = this.options


    for (let year in this.data) {
        var val = this.data[year];
        var barHeight = this.scale(val)

        const barTopX = (padding) + (i * barWidth) + (i * gutter)
        const barTopY = this.canvas.height - barHeight - padding
        const color = this.colors[ i % this.colors.length ]

        drawBar(this.ctx, barTopX, barTopY, barWidth, barHeight, color);
        i++;
    }
}


CanvasBarChart.prototype.draw = function() {
  this.canvas.width = this.canvasActualWidth
  this.canvas.height = this.canvasActualHeight

  // this.drawGrid()
  this.drawBars()
  // this.drawLabel()
}

CanvasBarChart.prototype.drawLabel = function() {
    //drawing series name
    this.ctx.save();
    this.ctx.textBaseline="bottom";
    this.ctx.textAlign="center";
    this.ctx.fillStyle = "#000000";
    this.ctx.font = "bold 14px Arial";
    this.ctx.fillText(this.options.seriesName, this.canvas.width/2,this.canvas.height);
    this.ctx.restore();
}
