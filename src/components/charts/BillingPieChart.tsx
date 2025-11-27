import PieCenterLabel from '@/components/charts/PieCenterLabel';
import { capitalize } from '@/lib/utils';
import { BillBreakdown } from '@/types/companyData';
import { PieValueType } from '@mui/x-charts';
import { PieChart } from '@mui/x-charts/PieChart';

type BillingPieChartProps = {
  data: BillBreakdown[];
};

export default function BillingPieChart({ data }: BillingPieChartProps) {
  const statusColors = {
    completed: '#10b981', // tailwind emerald-500
    pending: '#f59e0b', // tailwind amber-500
    processing: '#3b82f6', // tailwind blue-500
    canceled: '#f43f5e', // tailwind rose-500
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
