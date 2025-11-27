import ActiveUsersBarChart from '@/components/charts/ActiveUsersBarChart';
import BillingPieChart from '@/components/charts/BillingPieChart';
import RevenueLineChart from '@/components/charts/RevenueLineChart';
import TaskIcon from '@mui/icons-material/Task';
import { getActiveUsers, getBills, getRevenue } from '@/lib/data-access';
import { Box } from '@mui/material';
import NavCard from '@/components/ui/NavCard';
import PageTitle from '@/components/ui/PageTitle';
import { REPORTS_PAGE_DESCRIPTION } from '@/app/reports/page';

export const HOME_PAGE_DESCRIPTION =
  'Track data and analytics with an intuitive and simple visualization.';

async function HomePage() {
  const [billsData, revenueData, activeUsersData] = await Promise.all([
    getBills(),
    getRevenue(),
    getActiveUsers(),
  ]);

  return (
    <Box className="flex flex-col w-[80%] h-[80%]">
      <PageTitle title="Dashboard" description={HOME_PAGE_DESCRIPTION} />

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
        <Box className="col-span-2 row-span-4">
          <NavCard
            href="/reports"
            title="Go to tasks!"
            description={REPORTS_PAGE_DESCRIPTION}
            icon={TaskIcon}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;
