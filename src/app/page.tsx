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
    <Box className="flex flex-col w-[80%] h-[80%]">
      <h2 className="mt-8 text-4xl text-left">Dashboard View</h2>
      <Box className="grid grid-cols-7 grid-rows-8 gap-4 p-10 h-full">
        <Box className="col-span-4 row-span-4">
          <ActiveUsersBarChart data={activeUsersData} />
        </Box>
        <Box className="col-span-3 row-span-4">
          <BillingPieChart data={billsData.breakdown} />
        </Box>
        <Box className="col-span-5 row-span-5 ">
          <RevenueLineChart data={revenueData.monthly} />
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;
