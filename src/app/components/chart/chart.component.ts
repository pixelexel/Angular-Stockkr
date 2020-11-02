import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { Options } from 'highcharts/highstock';
import { DetailsService } from '../../services/details.service';
import indicators from 'highcharts/indicators/indicators';
indicators(Highcharts);
import vbp from 'highcharts/indicators/volume-by-price';
vbp(Highcharts);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  @Input() ticker: string;

  Highcharts: typeof Highcharts = Highcharts;
  ohlc = [];
  volume = [];
  updateFlag = false;

  chartOptions: Options = {
    series: [
      {
        type: 'candlestick',
        name: 'this.ticker',
        id: '1',
        zIndex: 2,
        data: this.ohlc,
      },
      {
        type: 'column',
        name: 'Volume',
        id: 'volume',
        data: this.volume,
        yAxis: 1,
      },
      {
        type: 'vbp',
        linkedTo: '1',
        params: {
          volumeSeriesID: 'volume',
        },
        dataLabels: {
          enabled: false,
        },
        zoneLines: {
          enabled: false,
        },
      },
      {
        type: 'sma',
        linkedTo: '1',
        zIndex: 1,
        marker: {
          enabled: false,
        },
      },
    ],
  };
  historyRunOutsideAngularFlag: boolean = false;

  constructor(private detailsService: DetailsService) {}

  ngOnInit(): void {
    let today = new Date();
    today.setFullYear(today.getFullYear() - 2);
    this.detailsService
      .getCharts2(this.ticker, today.toISOString().slice(0, 10))
      .subscribe((data) => {
        let chartData = Object.values(data);
        for (var i = 0; i < chartData.length; i++) {
          //DAYLIGHT!
          //convert to pst
          var date = new Date(chartData[i].date);
          var utcDate = new Date(date.toUTCString());
          utcDate.setHours(utcDate.getHours() - 8);
          var pst = new Date(utcDate);
          var result_date = pst.getTime();

          this.ohlc.push([
            result_date, // the date
            chartData[i].open, // open
            chartData[i].high, // high
            chartData[i].low, // low
            chartData[i].close, // close
          ]);

          this.volume.push([
            result_date, // the date
            chartData[i].volume, // the volume
          ]);
        }
        this.updateChart();
      });
  }

  updateChart() {
    this.chartOptions = {
      title: {
        text: this.ticker + ' Historical',
      },

      rangeSelector: {
        selected: 2,
      },

      subtitle: {
        text: 'With SMA and Volume by Price technical indicators',
      },

      yAxis: [
        {
          startOnTick: false,
          endOnTick: false,
          labels: {
            align: 'right',
            x: -3,
          },
          title: {
            text: 'OHLC',
          },
          height: '60%',
          lineWidth: 2,
          resize: {
            enabled: true,
          },
        },
        {
          labels: {
            align: 'right',
            x: -3,
          },
          title: {
            text: 'Volume',
          },
          top: '65%',
          height: '35%',
          offset: 0,
          lineWidth: 2,
        },
      ],

      tooltip: {
        split: true,
      },

      series: [
        {
          type: 'candlestick',
          name: this.ticker,
          id: 'aapl',
          zIndex: 2,
          data: this.ohlc,
        },
        {
          type: 'column',
          name: 'Volume',
          id: 'volume',
          data: this.volume,
          yAxis: 1,
        },
        {
          type: 'vbp',
          linkedTo: 'aapl',
          params: {
            volumeSeriesID: 'volume',
          },
          dataLabels: {
            enabled: false,
          },
          zoneLines: {
            enabled: false,
          },
        },
        {
          type: 'sma',
          linkedTo: 'aapl',
          zIndex: 1,
          marker: {
            enabled: false,
          },
        },
      ],
    };
    this.updateFlag = true;
  }
}
