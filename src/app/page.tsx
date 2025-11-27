import BillingPieChart, { PieChartItem } from '@/components/charts/BillingPieChart';
import RevenueLineChart from '@/components/charts/RevenueLineChart';
import { getBills, getRevenue } from '@/lib/data-access';
import { capitalize } from '@/lib/utils';
import { Box } from '@mui/material';

async function HomePage() {
  const defaultColor = 'grey';

  const statusColors = {
    completed: '#10b981', // tailwind emerald-500
    pending: '#f59e0b', // tailwind amber-500
    processing: '#3b82f6', // tailwind blue-500
    canceled: '#f43f5e', // tailwind rose-500
  };

  const [billsData, revenueData] = await Promise.all([
    getBills(),
    getRevenue(),
  ]);

  // TODO maybe refactor BillingPieChart to handle its items and colors inside
  // map billsData to PieChartItem elements
  const pieChartItems: PieChartItem[] = billsData.breakdown.map((b) => ({
    id: b.status,
    label: capitalize(b.status),
    value: b.count,
    color: statusColors[b.status] || defaultColor,
  }));

  return (
    <Box className="flex flex-col">
      <h2 className="mt-8 text-4xl text-center">Dashboard View</h2>
      <Box className="grid grid-cols-4 grid-rows-4 gap-4 max-h-fit p-32">
        <Box className="row-start-1 col-start-1">
          <BillingPieChart data={billsData.breakdown} />
        </Box>
        <Box className="row-start-2 col-span-4 row-span-3">
          <RevenueLineChart data={revenueData.monthly} />
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;
