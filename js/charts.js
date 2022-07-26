am4core.ready(function () {

    // Chart 1  Begin Here

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Create chart instance
  var chart = am4core.create("chartdiv", am4charts.XYChart);
  chart.scrollbarX = new am4core.Scrollbar();

  chart.logo.disabled = true;
  chart.rtl = true;

  // Add data
  chart.data = [{
      "month": "فروردین",
      "visits": 3025
  }, {
      "month": "اردیبهشت",
      "visits": 1882
  }, {
      "month": "خرداد",
      "visits": 1809
  }, {
      "month": "تیر",
      "visits": 1322
  }, {
      "month": "مرداد",
      "visits": 1122
  }, {
      "month": "شهریور",
      "visits": 1114
  }, {
      "month": "مهر",
      "visits": 984
  }, {
      "month": "آبان",
      "visits": 711
  }];

  prepareParetoData();

  function prepareParetoData() {
      var total = 0;

      for (var i = 0; i < chart.data.length; i++) {
          var value = chart.data[i].visits;
          total += value;
      }

      var sum = 0;
      for (var i = 0; i < chart.data.length; i++) {
          var value = chart.data[i].visits;
          sum += value;
          chart.data[i].pareto = sum / total * 100;
      }
  }
  // Create axes
  var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "month";
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.renderer.minGridDistance = 60;
  categoryAxis.tooltip.disabled = true;

  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.renderer.minWidth = 50;
  valueAxis.min = 0;
  valueAxis.cursorTooltipEnabled = false;

  // Create series
  var series = chart.series.push(new am4charts.ColumnSeries());
  series.sequencedInterpolation = true;
  series.dataFields.valueY = "visits";
  series.dataFields.categoryX = "month";
  series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
  series.columns.template.strokeWidth = 0;

  series.tooltip.pointerOrientation = "vertical";

  series.columns.template.column.cornerRadiusTopLeft = 10;
  series.columns.template.column.cornerRadiusTopRight = 10;
  series.columns.template.column.fillOpacity = 0.8;

  // on hover, make corner radiuses bigger
  var hoverState = series.columns.template.column.states.create("hover");
  hoverState.properties.cornerRadiusTopLeft = 0;
  hoverState.properties.cornerRadiusTopRight = 0;
  hoverState.properties.fillOpacity = 1;

  series.columns.template.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
  })


  var paretoValueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  paretoValueAxis.renderer.opposite = true;
  paretoValueAxis.min = 0;
  paretoValueAxis.max = 100;
  paretoValueAxis.strictMinMax = true;
  paretoValueAxis.renderer.grid.template.disabled = true;
  paretoValueAxis.numberFormatter = new am4core.NumberFormatter();
  paretoValueAxis.numberFormatter.numberFormat = "#'%'"
  paretoValueAxis.cursorTooltipEnabled = false;

  var paretoSeries = chart.series.push(new am4charts.LineSeries())
  paretoSeries.dataFields.valueY = "pareto";
  paretoSeries.dataFields.categoryX = "month";
  paretoSeries.yAxis = paretoValueAxis;
  paretoSeries.tooltipText = "درصد: {valueY.formatNumber('#.0')}%[/]";
  paretoSeries.bullets.push(new am4charts.CircleBullet());
  paretoSeries.strokeWidth = 2;
  paretoSeries.stroke = new am4core.InterfaceColorSet().getFor("alternativeBackground");
  paretoSeries.strokeOpacity = 0.5;

  // Cursor
  chart.cursor = new am4charts.XYCursor();
  chart.cursor.behavior = "panX";

//  End Chart 1


//   Chart 2 Begin Here
  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  // Create chart instance
  var chart = am4core.create("chartdiv2", am4charts.PieChart);
  chart.logo.disabled = true;
  chart.rtl = true;
  
  // Add and configure Series
  var pieSeries = chart.series.push(new am4charts.PieSeries());
  pieSeries.dataFields.value = "value";
  pieSeries.dataFields.category = "label";

  // Let's cut a hole in our Pie chart the size of 30% the radius
  chart.innerRadius = am4core.percent(30);

  // Put a thick white border around each Slice
  pieSeries.slices.template.stroke = am4core.color("#fff");
  pieSeries.slices.template.strokeWidth = 2;
  pieSeries.slices.template.strokeOpacity = 1;
  pieSeries.slices.template
      // change the cursor on hover to make it apparent the object can be interacted with
      .cursorOverStyle = [
          {
              "property": "cursor",
              "value": "pointer"
          }
      ];

  pieSeries.alignLabels = false;
  pieSeries.labels.template.text = "{value.percent.formatNumber('#.0')}%";

  pieSeries.ticks.template.disabled = true;

  // Create a base filter effect (as if it's not there) for the hover to return to
  var shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
  shadow.opacity = 0;

  // Create hover state
  var hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

  // Slightly shift the shadow and make it more prominent on hover
  var hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
  hoverShadow.opacity = 0.7;
  hoverShadow.blur = 5;

  // Add a legend
  chart.legend = new am4charts.Legend();
  chart.legend.itemContainers.template.reverseOrder = true;
  chart.data = [{
      "label": "پرداختی موفق",
      "value": 501.9
  }, {
      "label": "پرداختی ناموفق",
      "value": 165.8
  }];

//   End Chart 2

}); 
// end am4core.ready()