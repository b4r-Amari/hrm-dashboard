import React, { useEffect, useState } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, LineSeries, Inject, Category, Tooltip } from '@syncfusion/ej2-react-charts';
import { dummyReadings, createRealTimeFeed } from '../app/lib/dummy';
import type {  AthleteReading } from '../app/lib/dummy';

type HRReading = AthleteReading;

const HRgraph: React.FC = () => {
  const [data, setData] = useState<HRReading[]>([]);

  useEffect(() => {
    const stopFeed = createRealTimeFeed(dummyReadings, 2000)((newReading: HRReading) => {
      setData(prev => [...prev, newReading]);
    });
    return () => stopFeed();
  }, []);

  // Group data by athlete for separate series
  const athletes = Array.from(new Set(data.map(d => d.athlete)));

  return (
    <div className='w-full max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-400'>
      <h4 className="font-semibold mb-2">Heart Rate Monitor Data</h4>

      <div className='w-full h-[200px]'>
        <ChartComponent
        primaryXAxis={{ valueType: 'Category', title: 'Time' }}
        primaryYAxis={{ title: 'Heart Rate (bpm)' }}
        tooltip={{ enable: true }}
        legendSettings={{ visible: true }}
        className="pb-15"
        >
          <Inject services={[LineSeries, Category, Tooltip]} />
          <SeriesCollectionDirective>
            {athletes.map(name => {
              const seriesData = data
                .filter(d => d.athlete === name)
                .map(d => ({ x: d.timestamp, y: d.heartRate }));
              return (
                <SeriesDirective
                  key={name}
                  dataSource={seriesData}
                  xName="x"
                  yName="y"
                  name={name}
                  type="Line"
                  marker={{ visible: true }}
                />
              );
            })}
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
};

export default HRgraph;