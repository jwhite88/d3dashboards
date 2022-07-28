import React from 'react';
import './App.css';
import Histogram  from './components/elements/Histogram';
import { data } from './data/histogramData'
import { dataAxis } from "./data/histogramDataAxis";
import HistogramAxis  from './components/elements/HistogramAxis';
import Scatterplot from './components/elements/Scatterplot';
import { dataScatter } from './data/scatterData';
import BarPlotSide from './components/elements/BarPlotSide';
import { dataBarSide } from "./data/barplotSide";
import PieChart from './components/elements/PieChart';
import { dataPie } from './data/pieData'

function App() {
  return (
    <div className="App">
     {/* <Histogram 
        data={data}
        width={400}
        height={400}
     /> */}
      {/* <HistogramAxis data={dataAxis} width={600} height={400} /> */}
      <Scatterplot data={dataScatter} width={500} height={400} />
      {/* <BarPlotSide data={dataBarSide} width={550} height={400} /> */}
      <PieChart data={dataPie} width={400} height={400} />
    </div>
  );
}

export default App;
