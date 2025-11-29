'use client'; // TODO use client is just because of the valueFormatters , can try to narrow

import { Coordinates, formatEuros, mean, regression } from '@/lib/utils';
import {
  RevenueData,
  MonthlyRevenue,
  YearlyRevenue,
} from '@/types/companyData';

import { LineChart } from '@mui/x-charts/LineChart';
import { useMemo, useState } from 'react';
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';

type RevenueLineChartProps = {
  data: RevenueData;
};

// Helper function to process data (outside of component to keep it pure)
const processChartData = (rawData: MonthlyRevenue[] | YearlyRevenue[]) => {
  const coordinates: Coordinates[] = rawData.map((item, i) => ({
    x: i,
    y: item.euros,
  }));

  const trendLine = regression(coordinates);
  const dataMean = mean(rawData.map((rev) => rev.euros));

  return rawData.map((item, i) => ({
    ...item,
    trend: trendLine[i].y,
    mean: dataMean,
  }));
};

export default function RevenueLineChart({ data }: RevenueLineChartProps) {
  const [view, setView] = useState<'monthly' | 'yearly'>('monthly');

  const handleViewChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: 'monthly' | 'yearly' | null
  ) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  // Optimizaton: Memoize both datasets independently.
  const monthlyChartData = useMemo(
    () => processChartData(data.monthly),
    [data.monthly]
  );
  const yearlyChartData = useMemo(
    () => processChartData(data.yearly),
    [data.yearly]
  );

  const currentYear = data.yearly.at(-1)?.year;

  const activeData = view === 'monthly' ? monthlyChartData : yearlyChartData;
  const dataKey = view === 'monthly' ? 'month' : 'year';

  return (
    <Box className="h-full w-full relative">
      {/* View Switcher */}
      <Box className="absolute top-0 left-1/2 -translate-x-1/2 z-10 h-[5%]">
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          aria-label="revenue view switch"
          size="small"
          color="primary"
          sx={{
            boxShadow: 1,
            height: '100%',
          }}
        >
          <ToggleButton value="yearly">Yearly</ToggleButton>
          <ToggleButton value="monthly">
            {currentYear || 'Monthly'}
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Chart */}
      <LineChart
        // key={view} forces a remount of the chart component on toggle,
        // this makes it so the toggle causes the erase + redraw animation.
        key={view}
        dataset={activeData}
        xAxis={[
          {
            scaleType: 'point',
            dataKey: dataKey,
          },
        ]}
        series={[
          {
            dataKey: 'euros',
            label: `${view === 'monthly' ? 'Monthly' : 'Yearly'} Revenue`,
            color: '#02b2af',
            showMark: false,
            curve: 'linear',
            area: false,
            valueFormatter: (value: number | null) => formatEuros(value, 'n'),
          },
          {
            dataKey: 'trend',
            label: 'Trend',
            color: 'blue', // TODO Distinct color for trend
            showMark: false,
            curve: 'linear',
            disableHighlight: true, // Not interactable
            valueFormatter: (value: number | null) => formatEuros(value, 'n'),
          },
          {
            dataKey: 'mean',
            label: 'Mean',
            color: 'rgba(255, 0, 0, 0.15)', // TODO distinct color for mean
            showMark: false,
            curve: 'linear',
            disableHighlight: true, // Not interactable
            area: true,
            valueFormatter: (value: number | null) => formatEuros(value, 'n'),
          },
        ]}
        yAxis={[
          {
            label: 'Revenue (€)',
            valueFormatter: (value: number) => formatEuros(value, 'a', 0),
          },
        ]}
        grid={{ horizontal: true }}
        slotProps={{
          legend: {
            position: { vertical: 'bottom', horizontal: 'center' },
            direction: 'horizontal',
          },
        }}
      />
    </Box>
  );
}
