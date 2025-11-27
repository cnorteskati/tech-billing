'use client'; // TODO use client is just because of the valueFormatters , can try to narrow

// TODO adapt to have a switch between Monthly and Yearly, right now only has Monthly

import { Coordinates, formatEuros, mean, regression } from '@/lib/utils';

import { LineChart } from '@mui/x-charts/LineChart';
import { useMemo } from 'react';

export type RevenueData = {
  month: string;
  euros: number;
};

type RevenueLineChartProps = {
  data: RevenueData[];
};

export default function RevenueLineChart({ data }: RevenueLineChartProps) {
  // Combine all data transformation in one memoized block
  const mergedChartData = useMemo(() => {
    // We use the index (i) as 'x' because months are categorical/sequential
    const coordinates: Coordinates[] = data.map((item, i) => ({
      x: i,
      y: item.euros,
    }));

    // Merge trend into data
    const trendLine = regression(coordinates);
    const mergedTrendData = data.map((item, i) => ({
      ...item,
      trend: trendLine[i].y,
    }));

    // Merge mean into data
    const dataMean = mean(data.map((rev) => rev.euros));
    const mergedMeanAndTrendData = mergedTrendData.map((item) => ({
      ...item,
      mean: dataMean,
    }));

    return mergedMeanAndTrendData;
  }, [data]);

  return (
    <LineChart
      dataset={mergedChartData}
      xAxis={[
        {
          scaleType: 'point',
          dataKey: 'month',
        },
      ]}
      series={[
        {
          dataKey: 'euros',
          label: 'Monthly Revenue',
          color: '#02b2af',
          showMark: false, // Cleaner look without dots on every point
          curve: 'linear',
          area: false,
          valueFormatter: (value: number | null) => formatEuros(value, 'n'),
        },
        {
          dataKey: 'trend',
          label: 'Trend',
          color: 'blue', // TODO Distinct color for trend
          showMark: false, // Cleaner look without dots on every point
          curve: 'linear',
          disableHighlight: true, // Not interactable
          valueFormatter: (value: number | null) => formatEuros(value, 'n'),
        },
        {
          dataKey: 'mean',
          label: 'Mean',
          color: 'rgba(255, 0, 0, 0.15)', // TODO distinct color for mean
          showMark: false, // Cleaner look without dots on every point
          curve: 'linear',
          disableHighlight: true, // Not interactable
          area: true,
          valueFormatter: (value: number | null) => formatEuros(value, 'n'),
        },
      ]}
      yAxis={[
        {
          label: 'Revenue (€)',
          valueFormatter: (value: number) => formatEuros(value, 'k', 0),
        },
      ]}
      grid={{ horizontal: true }}
      slotProps={{
        legend: {
          position: { vertical: 'top', horizontal: 'end' },
          direction: 'horizontal',
        },
      }}
    />
  );
}
