import NavCard from '@/components/ui/NavCard';
import PageTitle from '@/components/ui/PageTitle';
import { Box } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import { HOME_PAGE_DESCRIPTION } from '@/app/page';
import { getDocumentation, getReports, getTasks } from '@/lib/data-access';
import DeadlinesList from '@/components/requirements/DeadlinesList';
import DocsList from '@/components/requirements/DocsList';
import ReportsList from '@/components/requirements/ReportsList';
import InvoicePreview from '@/components/requirements/InvoicePreview';
import { Metadata } from 'next';

export const REPORTS_PAGE_DESCRIPTION =
  'Check mandatory reports, documentation, and critical deadlines.';

export const metadata: Metadata = {
  title: 'Reports',
  description: REPORTS_PAGE_DESCRIPTION,
};

async function ReportsPage() {
  const [tasksData, docsData, reportsData] = await Promise.all([
    getTasks(),
    getDocumentation(),
    getReports(),
  ]);

  return (
    <Box className="flex flex-col w-full xl:w-[90%] xl:h-[90%] mx-auto p-4 md:p-10">
      <Box
        className="grid flex-1 min-h-0 gap-4 md:gap-x-10 md:gap-y-6 xl:gap-x-20 xl:gap-y-8 
                   grid-cols-2 grid-rows-14
                   md:grid-cols-2 md:grid-rows-10 max-h-[180vh] md:max-h-[150vh] xl:max-h-screen
                   xl:grid-cols-3 xl:grid-rows-6"
      >
        <Box
          className="order-1 md:order-0
                     col-start-1 col-span-2 row-start-1 row-span-1
                     md:col-start-2 md:col-span-1 md:row-start-1 md:row-span-1
                     xl:col-start-2 xl:col-span-1 xl:row-start-1 xl:row-span-1"
        >
          <PageTitle
            title="Company Reports"
            description={REPORTS_PAGE_DESCRIPTION}
          />
        </Box>

        <Box
          className="order-2 md:order-0
                      md:min-h-0
                     col-start-1 col-span-1 row-start-2 row-span-8
                     md:col-start-1 md:col-span-1 md:row-start-1 md:row-span-4
                     xl:col-start-2 xl:col-span-1 xl:row-start-2 xl:row-span-5"
        >
          <DeadlinesList tasksData={tasksData} />
        </Box>

        <Box
          className="order-3 md:order-0
                      md:min-h-0
                     col-start-2 col-span-1 row-start-2 row-span-8
                     md:col-start-2 md:col-span-1 md:row-start-2 md:row-span-7
                     xl:col-start-1 xl:col-span-1 xl:row-start-1 xl:row-span-6"
        >
          <InvoicePreview />
        </Box>

        <Box
          className="order-4 md:order-0
                     col-start-1 col-span-1 row-start-10 row-span-3
                     md:col-start-1 md:col-span-1 md:row-start-5 md:row-span-3
                     xl:col-start-3 xl:col-span-1 xl:row-span-2"
        >
          <ReportsList reportsData={reportsData} />
        </Box>

        <Box
          className="order-5 md:order-0
                     col-start-2 col-span-1 row-start-10 row-span-3
                     md:col-start-1 md:col-span-1 md:row-start-8 md:row-span-3
                     xl:col-start-3 xl:col-span-1 xl:row-span-2"
        >
          <DocsList docsData={docsData} />
        </Box>

        <Box
          className="order-6 md:order-0
                     col-start-1 col-span-2 row-start-13 row-span-2
                     md:col-start-2 md:col-span-1 md:row-start-9 md:row-span-2
                     xl:col-start-3 xl:col-span-1 xl:row-span-2"
        >
          <NavCard
            href="/"
            title="Go to dashboard!"
            description={HOME_PAGE_DESCRIPTION}
            icon={BarChartIcon}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ReportsPage;
