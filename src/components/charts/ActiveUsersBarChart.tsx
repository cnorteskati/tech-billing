'use client'; // TODO see if its possible to narrow down

import { ActiveUser } from '@/types/companyData';
import { BarChart } from '@mui/x-charts/BarChart';

type ActiveUsersBarChartProps = {
  data: ActiveUser[];
};

export default function ActiveUsersBarChart({
  data,
}: ActiveUsersBarChartProps) {
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
          color: '#02b2af',
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
