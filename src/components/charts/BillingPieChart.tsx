'use client';

import PieCenterLabel from '@/components/charts/PieCenterLabel';
import { capitalize } from '@/lib/utils';
import { BillBreakdown } from '@/types/companyData';
import { alpha, useTheme } from '@mui/material';
import { PieValueType } from '@mui/x-charts';
import { PieChart } from '@mui/x-charts/PieChart';

type BillingPieChartProps = {
  data: BillBreakdown[];
};

export default function BillingPieChart({ data }: BillingPieChartProps) {
  const theme = useTheme();

  const statusColors = {
    completed: alpha(theme.palette.success.light, 0.8),
    pending: alpha(theme.palette.warning.light, 0.8),
    processing: alpha(theme.palette.info.light, 0.8),
    canceled: alpha(theme.palette.error.light, 0.8),
    default: 'grey',
  };

  // Calculate total for the center label
  const total = data.reduce((acc, item) => acc + item.count, 0);

  // map BillBreakdown elements to PieChartItem elements
  const pieChartItems: PieValueType[] = data.map((bill) => ({
    id: bill.status,
    label: capitalize(bill.status),
    value: bill.count,
    color: statusColors[bill.status] || statusColors['default'],
  }));

  return (
    <PieChart
      series={[
        {
          data: pieChartItems,
          // 'innerRadius' creates the Donut effect
          innerRadius: '60%',
          outerRadius: '90%',
          paddingAngle: 2,
          cornerRadius: 2,
          // Maps the data properties to what MUI expects
          //  (optional if names match, but good for safety)
          id: 'bills-breakdown',
          highlightScope: { fade: 'global', highlight: 'item' },

          faded: { color: 'gray' },
          highlighted: { additionalRadius: 10 },
        },
      ]}
      slotProps={{
        legend: {
          direction: 'vertical',
          position: { vertical: 'middle', horizontal: 'end' },
        },
      }}
    >
      <PieCenterLabel>{total.toLocaleString()} Bills</PieCenterLabel>
    </PieChart>
  );
}
