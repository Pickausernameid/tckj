window.onload = function() {
    // nav
    let ul = getIdName("nav_bar", 0)
    let nodes = ul.querySelectorAll('li')
    nodes.forEach((item, index) => {
        item.addEventListener('click', () => {
            nodes.forEach((item_click, index_click) => {
                item_click.className = ''
            })
            item.className = 'animation'

        }, false)

        item.addEventListener('mouseover', () => {
            nodes.forEach((item_click, index_click) => {
                item_click.className = ''
            })
            item.className = 'animation'
        }, false)

        // item.addEventListener('mouseout', () => {
        //     item.className = ''
        // }, false)
    })

    // swiper
    swiper({
        li: "li", //默认值：li;默认用li包裹
        boxid: "boxhdp", //最外面div  id
        imgid: "swiper_ul", //图片外面id
        optid: "swiper_li", //opt外面id	
        an: "an", //左右按钮id，用于移上显示和隐藏
        prev: "prev", //左边箭头id
        next: "next", //右边箭头id
        ms: 3000 //多少毫秒切换一张,默认800毫秒
    })

    // 曲线图数据展示
    ajax(
        'get',
        'https://edu.telking.com/api/?type=month',
        null,
        function(res) {
            res = JSON.parse(res)
            if (res.code == 200) {
                let data = res.data
                let chartDom = document.getElementById('graph_echarts');
                let myChart = echarts.init(chartDom);

                let option = {
                    title: {
                        show: true, //false
                        text: "曲线图数据展示", //主标题文本
                        textStyle: {
                            color: '#262b2e', //'red'，字体颜色
                            fontStyle: 'normal', //'italic'(倾斜) | 'oblique'(倾斜体) ，字体风格
                            fontWeight: 'normal', //'bold'(粗体) | 'bolder'(粗体) | 'lighter'(正常粗细) ，字体粗细
                            fontFamily: 'sans-serif', //'sans-serif' | 'serif' | 'monospace' | 'Arial' | 'Courier New' 
                            // 'Microsoft YaHei'(微软雅黑) ，文字字体
                            fontSize: 20, //字体大小
                            lineHeight: 20, //字体行高

                        },
                        left: '45%',

                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: data.xAxis
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} 人'
                        },
                        splitLine: {
                            lineStyle: {
                                type: 'dashed' //虚线
                            },
                            show: true //隐藏
                        }
                    },
                    series: [{
                        data: data.series,
                        type: 'line',
                        lineStyle: { // 设置线条的style等
                            normal: {
                                color: '#4587ef', // 折线线条颜色:红色
                            },
                        },
                        areaStyle: {
                            normal: {
                                color: ['#f3f7fe'],
                                opacity: 0.2
                            }
                        },

                    }]
                };
                option && myChart.setOption(option);


            }
        }
    )

    // 饼状图数据/柱状图数据
    ajax(
        'get',
        'https://edu.telking.com/api/?type=week',
        null,
        function(res) {
            res = JSON.parse(res)
            if (res.code == 200) {
                let data = res.data
                console.log('data', data)
                let series = data.series
                let xAxis = data.xAxis
                let echarts_data = []
                for (let i = 0; i < xAxis.length; i++) {
                    let obj = {};
                    for (let j = 0; j < series.length; j++) {
                        if (i == j) {
                            obj.name = xAxis[i];
                            obj.value = series[j];
                            echarts_data.push(obj);
                        }
                    }
                }
                console.log('echarts_data', echarts_data);

                // 饼状图
                let chartDom = document.getElementById('pie_echarts');
                let myChart = echarts.init(chartDom);
                let option;

                option = {
                    title: {
                        show: true, //false
                        text: "饼状图数据展示", //主标题文本
                        textStyle: {
                            color: '#262b2e', //'red'，字体颜色
                            fontStyle: 'normal', //'italic'(倾斜) | 'oblique'(倾斜体) ，字体风格
                            fontWeight: 'normal', //'bold'(粗体) | 'bolder'(粗体) | 'lighter'(正常粗细) ，字体粗细
                            fontFamily: 'sans-serif', //'sans-serif' | 'serif' | 'monospace' | 'Arial' | 'Courier New' 
                            // 'Microsoft YaHei'(微软雅黑) ，文字字体
                            fontSize: 20, //字体大小
                            lineHeight: 20, //字体行高

                        },
                        left: '36%',

                    },
                    tooltip: {
                        trigger: 'item',

                    },

                    legend: {
                        show: false,
                    },
                    series: [{

                        type: 'pie',
                        radius: '50%',
                        data: echarts_data,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                };

                option && myChart.setOption(option);

                // 柱状图
                let chartDom_bar = document.getElementById('bar_echarts');
                let myChart_bar = echarts.init(chartDom_bar);
                let option_bar;

                option_bar = {
                    title: {
                        show: true, //false
                        text: "柱状图数据展示", //主标题文本
                        textStyle: {
                            color: '#262b2e', //'red'，字体颜色
                            fontStyle: 'normal', //'italic'(倾斜) | 'oblique'(倾斜体) ，字体风格
                            fontWeight: 'normal', //'bold'(粗体) | 'bolder'(粗体) | 'lighter'(正常粗细) ，字体粗细
                            fontFamily: 'sans-serif', //'sans-serif' | 'serif' | 'monospace' | 'Arial' | 'Courier New' 
                            // 'Microsoft YaHei'(微软雅黑) ，文字字体
                            fontSize: 20, //字体大小
                            lineHeight: 20, //字体行高

                        },
                        left: '36%',

                    },
                    xAxis: {
                        type: 'category',
                        data: xAxis
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} 人'
                        },
                        splitLine: {
                            lineStyle: {
                                type: 'dashed' //虚线
                            },
                            show: true //隐藏
                        }
                    },
                    series: [{
                        data: series,
                        type: 'bar',
                        barWidth: 20,
                    }]
                };

                option_bar && myChart_bar.setOption(option_bar);
            }
        }
    )


    // 

}