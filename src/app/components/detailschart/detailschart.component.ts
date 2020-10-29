import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { Options } from 'highcharts/highstock';
import { DetailsService } from '../../services/details.service';

@Component({
  selector: 'app-detailschart',
  templateUrl: './detailschart.component.html',
  styleUrls: ['./detailschart.component.css'],
})
export class DetailschartComponent implements OnInit {
  @Input() ticker: string;

  Highcharts: typeof Highcharts = Highcharts;
  datePrice = [];
  updateFlag = false;
  marketColor = '#297f00';
  today = new Date().toISOString().slice(0, 10);

  chartOptions: Options = {
    series: [
      {
        type: 'line',
        data: [[1, 2, 3, 4]],
      },
    ],
  };

  constructor(private detailsService: DetailsService) {}

  ngOnInit(): void {
    console.log(this.today);
    //MARKET CLOSE => check prev day after day change
    //Check day before for when market is closed
    //LAST TIMESTAMP FROM 4.1.2 for holidays
    this.detailsService
      .getCharts1(this.ticker, this.today)
      .subscribe((data) => {
        let chartData = Object.values(data);
        //console.log(chartData);
        for (var i = 0; i < chartData.length; i++) {
          //DAYLIGHT!
          //convert to pst
          var date = new Date(chartData[i].date);
          var utcDate = new Date(date.toUTCString());
          utcDate.setHours(utcDate.getHours() - 7);
          var pst = new Date(utcDate);
          var result = pst.getTime();
          this.datePrice.push([result, chartData[i].close]);
        }
        this.updateChart();
      });
  }
  updateChart() {
    this.chartOptions = {
      title: {
        text: this.ticker,
      },
      series: [
        {
          name: this.ticker,
          type: 'line',
          data: this.datePrice,
          color: this.marketColor,
          //gapSize: 5,
          yAxis: 0,
          tooltip: {
            valueDecimals: 2,
          },
        },
      ],

      navigator: {
        series: {
          fillOpacity: 1,
          color: this.marketColor,
        },
      },

      // rangeSelector: {
      //   enabled: false,
      //   inputEnabled: false,
      // },

      xAxis: {
        tickmarkPlacement: 'on',
        maxPadding: 0,
        minPadding: 0,
      },

      plotOptions: {
        series: {
          pointPlacement: 'on',
        },
      },
    };
    this.updateFlag = true;
  }
}
