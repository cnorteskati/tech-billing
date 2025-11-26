import PieCenterLabel from '@/components/PieCenterLabel';
import { PieChart } from '@mui/x-charts/PieChart';

// TODO make responsive, stop using hardcoded pixel values

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
          innerRadius: 80,
          outerRadius: 120,
          paddingAngle: 2,
          cornerRadius: 4,
          // Maps the data properties to what MUI expects
          //  (optional if names match, but good for safety)
          id: 'bills-breakdown',
          highlightScope: { fade: 'global', highlight: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      height={300}
      width={400} // Basic default width, can be made responsive via a wrapper
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
