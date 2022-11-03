import React from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  StackingColumnSeries,
  Tooltip,
} from "@syncfusion/ej2-react-charts";

import {
  stackedCustomSeries,
  stackedPrimaryXAxis,
  stackedPrimaryYAxis,
} from "../../data/dummy";

import { useAppStyleStateContext } from "../../contexts/AppStyleContextProvider";

const onChartLoaded = (currentMode) => {
  let chart = document.getElementById("charts");
  let legendTextCol = chart.querySelectorAll('[id*="chart_legend_text_"]');
  let color = currentMode === "Dark" ? "#33373E" : "#fff";
  for (let i = 0; i < legendTextCol.length; i++) {
    //set the color to legend label
    legendTextCol[i].setAttribute("fill", color);
  }
};

const palette = ["#E94649", "#F6B53F", "#6FAAB0", "#C4C24A"];

const Stacked = ({ width, height }) => {
  const { currentMode } = useAppStyleStateContext();
  return (
    <ChartComponent
      width={width}
      height={height}
      id="charts"
      primaryXAxis={stackedPrimaryXAxis}
      primaryYAxis={stackedPrimaryYAxis}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={currentMode === "Dark" ? "#33373E" : "#fff"}
      loaded={onChartLoaded.bind(this)}
      palettes={palette}
    >
      <Inject services={[Legend, Category, StackingColumnSeries, Tooltip]} />
      <SeriesCollectionDirective>
        {stackedCustomSeries.map((item, index) => (
          <SeriesDirective key={index} {...item} />
        ))}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default Stacked;
