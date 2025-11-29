import ActiveUsersBarChart from '@/components/charts/ActiveUsersBarChart';
import BillingPieChart from '@/components/charts/BillingPieChart';
import RevenueLineChart from '@/components/charts/RevenueLineChart';
import TaskIcon from '@mui/icons-material/Task';
import { getActiveUsers, getBills, getRevenue } from '@/lib/data-access';
import { Box, Card } from '@mui/material';
import NavCard from '@/components/ui/NavCard';
import PageTitle from '@/components/ui/PageTitle';
import { REPORTS_PAGE_DESCRIPTION } from '@/app/reports/page';
import { Metadata } from 'next';

export const HOME_PAGE_DESCRIPTION =
  'Track data and analytics with an intuitive and simple visualization.';

export const metadata: Metadata = {
  title: 'Dashboard | Tech Billing',
  description: HOME_PAGE_DESCRIPTION,
};

// Shared styles for the dashboard widgets to ensure consistency
const widgetStyles = {
  borderRadius: 4,
  border: '1px solid',
  borderColor: 'divider',
  boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.04)', // TODO maybe change Subtle custom shadow
  p: { xs: 0, md: 1, lg: 2 },
};

async function HomePage() {
  const [billsData, revenueData, activeUsersData] = await Promise.all([
    getBills(),
    getRevenue(),
    getActiveUsers(),
  ]);

  return (
    <Box className="flex flex-col w-full xl:w-[85%] h-auto xl:h-[90%] mx-auto p-4 md:p-10">
      <PageTitle title="Dashboard" description={HOME_PAGE_DESCRIPTION} />

      <Box className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-7 xl:grid-rows-8 gap-6 mt-8 h-full">
        <Card
          className="col-span-1 xl:col-span-4 xl:row-span-4 min-h-[50vh] md:min-h-[40vh] xl:min-h-0"
          sx={widgetStyles}
        >
          <ActiveUsersBarChart data={activeUsersData} />
        </Card>

        <Card
          className="col-span-1 xl:col-span-3 xl:row-span-4 min-h-[50vh] md:min-h-[40vh] xl:min-h-0"
          sx={widgetStyles}
        >
          <BillingPieChart data={billsData.breakdown} />
        </Card>

        <Card
          className="col-span-1 md:col-span-1 xl:col-span-5 xl:row-span-4 min-h-[50vh] md:min-h-[40vh] xl:min-h-0"
          sx={widgetStyles}
        >
          <RevenueLineChart data={revenueData} />
        </Card>

        <Box className="col-span-1 xl:col-span-2 xl:row-span-4 min-h-[20vh] md:min-h-0 xl:min-h-0">
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
