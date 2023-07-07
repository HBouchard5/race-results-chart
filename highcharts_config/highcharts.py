from highcharts_core.highcharts import SharedOptions
from highcharts_core.highcharts import Chart
from highcharts_core.options.series.bar import BarSeries

#get standardized chart options from highcharts_config
my_shared_options = SharedOptions.from_js_literal('highcharts_config/shared_options.js')
#creates javascript code snippet
js_code_snippet = my_shared_options.to_js_literal()


#get highcharts templates
type_1_chart = Chart.from_js_literal(
    '../../project_resources/highcharts_config/bar-template-01.js'
)
type_2_chart = Chart.from_js_literal(
    '../../project_resources/highcharts_config/bar-template-02.js'
)

type_1_chart.container = 'chart1_div'
type_2_chart.container = 'chart2_div'

type_1_chart.add_series(BarSeries.from_csv('../../project_resources/data_files/data-file-01.csv'))
type_2_chart.add_series(BarSeries.from_csv('../../project_resources/data_files/data-file-02.csv'))

#creates javascript code snippet
type_1_chart_js = type_1_chart.to_js_literal()
type_2_chart_js = type_2_chart.to_js_literal()
