  import React, { useEffect, useState } from 'react';
  import { SparklineComponent, Inject as SparklineInject, SparklineTooltip } from '@syncfusion/ej2-react-charts';
  import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject as ChartInject, Legend, Tooltip, Category, LineSeries } from '@syncfusion/ej2-react-charts';
  import type { AthleteReading } from '../app/lib/dummy';

  const PerformanceTrend: React.FC = () => {
    const [avgHrData, setAvgHrData] = useState<number[]>([]);
    const [fatigueData, setFatigueData] = useState<number[]>([]);
    const [recoveryData, setRecoveryData] = useState<number[]>([]);
    const [compareData, setCompareData] = useState<AthleteReading[]>([]);

    useEffect(() => {
      const days = 7;
      const now = Date.now();
      const interval = 24 * 3600 * 1000;
      const hrSeries: number[] = [];
      const fatigueSeries: number[] = [];
      const recoverySeries: number[] = [];
      const comp: AthleteReading[] = [];

      const athletes = [
        { name: 'Kuzi Bvunyenge', sport: 'Sprinting' },
        { name: 'Lutho Vananda', sport: 'football' },
        { name: 'Peter Horn', sport: 'Body-Building' },
      ];

      athletes.forEach((ath, idx) => {
        for (let d = 0; d < days; d++) {
          hrSeries.push(60 + Math.random() * 100);
          fatigueSeries.push(Math.floor(Math.random() * 100));
          recoverySeries.push(Math.floor(Math.random() * 100));
          comp.push({
            id: `ath-${idx}`,
            timestamp: new Date(now - (days - d) * interval).toISOString(),
            heartRate: Math.floor(60 + Math.random() * 100),
            level: 'normal',
            isOnline: true,
            battery: 80,
            athlete: ath.name,
            sport: ath.sport,
          });
        }
      });

      setAvgHrData(hrSeries);
      setFatigueData(fatigueSeries);
      setRecoveryData(recoverySeries);
      setCompareData(comp);
    }, []);

    const sparkSettings = {
      height: '50px',
      width: '100%',
      type: 'Line' as const,
      xName: 'x',
      yName: 'y',
      tooltipSettings: { visible: true },
    };

    return (
      <div>
        {/* Comparison Chart */}
        <div className="col-span-full bg-white shadow rounded-lg p-4">
          <h4 className="font-semibold mb-2">Compare Athletes HR Trend</h4>
          <ChartComponent
            primaryXAxis={{ valueType: 'Category', title: 'Day' }}
            primaryYAxis={{ title: 'Heart Rate (bpm)' }}
            tooltip={{ enable: true }}
            legendSettings={{ visible: true }}
          >
          <ChartInject services={[LineSeries, Category, Tooltip, Legend]} />
            <SeriesCollectionDirective>
              {Array.from(new Set(compareData.map(r => r.athlete))).map(name => {
                const seriesData = compareData
                  .filter(r => r.athlete === name)
                  .map((r, i) => ({ x: `Day ${i + 1}`, y: r.heartRate }));
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

  export default PerformanceTrend;