'use client';

import { ActiveUser } from '@/types/companyData';
import { alpha, useTheme } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

type ActiveUsersBarChartProps = {
  data: ActiveUser[];
};

export default function ActiveUsersBarChart({
  data,
}: ActiveUsersBarChartProps) {
  const theme = useTheme();

  return (
    <BarChart
      dataset={data}
      xAxis={[
        {
          scaleType: 'band',
          dataKey: 'month',
        },
      ]}
      series={[
        {
          dataKey: 'count',
          label: 'Active Users',
          color: alpha(theme.palette.info.main, 0.8),
          valueFormatter: (value) => value?.toLocaleString() || '',
          highlightScope: { highlight: 'item' },
        },
      ]}
      yAxis={[
        {
          label: 'Active Users',
          valueFormatter: (value: number) => value.toLocaleString(),
        },
      ]}
      slotProps={{
        legend: {
          position: { vertical: 'top', horizontal: 'end' },
          direction: 'horizontal',
        },
      }}
      borderRadius={4}
    />
  );
}
