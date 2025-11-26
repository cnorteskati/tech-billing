import PieCenterLabel from '@/components/PieCenterLabel';
import { PieChart } from '@mui/x-charts/PieChart';

export type PieChartItem = {
  id: string; // MUI Charts prefers a unique ID for animations/updates
  label: string;
  value: number;
  color: string; // Hex code or valid CSS color string
};

type BillingPieChartProps = {
  items: PieChartItem[];
};

export default function BillingPieChart({ items }: BillingPieChartProps) {
  // Calculate total for the center label
  const total = items.reduce((acc, item) => acc + item.value, 0);

  return (
    <PieChart
      series={[
        {
          data: items,
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
          direction: 'horizontal',
          position: { vertical: 'bottom', horizontal: 'center' },
        },
      }}
    >
      <PieCenterLabel>{total.toLocaleString()} Total</PieCenterLabel>
    </PieChart>
  );
}
