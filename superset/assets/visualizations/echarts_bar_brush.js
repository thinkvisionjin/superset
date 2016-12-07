
import d3 from 'd3';
var echarts = require("echarts")
require("./echarts_bar_brush.css")


function echartsBarBrushViz(slice){
    const div = d3.select(slice.selector);
    const divID = slice.containerId
    const  refresh = function(){
        d3.json(slice.jsonEndpoint(), function (error, json) {
            const jdata = json.data;
            if (error !== null) {
                slice.error(error.responseText, error);
                return;
            }
            var ctype = 'bar'
            var seriesData = new Array()
            var xData = new Array()
            for(var i=0;i<jdata.length;i++){
                var ser;
                var ser = {name:jdata[i]['key'],type:ctype,data:[]}
                var vals = jdata[i]['values']
                for(var j=0;j<vals.length;j++){
                    xData[j] = vals[j]['x']
                    ser['data'][j] = vals[j]['y']
                }
                seriesData[i] = ser
            }

            div.selectAll('*').remove();
            try {
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById(divID));
                // 绘制图表
                myChart.setOption({
                    title: { text: 'ECharts Brush Bar' },
                    tooltip: {},
                    xAxis: {
                        data: xData
                    },
                    yAxis: {},
                    series: seriesData
                });
            } catch (e) {
                slice.error(e);
            }
            slice.done(json); 
        });
    };
    return {
        render: refresh,
        resize: refresh,
    };
}

module.exports = echartsBarBrushViz;