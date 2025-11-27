import ActiveUsersBarChart from '@/components/charts/ActiveUsersBarChart';
import BillingPieChart from '@/components/charts/BillingPieChart';
import RevenueLineChart from '@/components/charts/RevenueLineChart';
import { getActiveUsers, getBills, getRevenue } from '@/lib/data-access';
import { Box } from '@mui/material';

async function HomePage() {
  const [billsData, revenueData, activeUsersData] = await Promise.all([
    getBills(),
    getRevenue(),
    getActiveUsers(),
  ]);

  return (
    <Box className="flex flex-col">
      <h2 className="mt-8 text-4xl text-center">Dashboard View</h2>
      <Box className="grid grid-cols-4 grid-rows-4 gap-4 max-h-fit p-32">
        <Box className="row-start-1 col-span-3">
          <ActiveUsersBarChart data={activeUsersData} />
        </Box>
        <Box className="row-start-1 col-span-1">
          <BillingPieChart data={billsData.breakdown} />
        </Box>
        <Box className="row-start-2 col-span-4 row-span-2">
          <RevenueLineChart data={revenueData.monthly} />
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;
