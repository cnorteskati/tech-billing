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

export const REPORTS_PAGE_DESCRIPTION =
  'Check mandatory reports, documentation, and critical deadlines.';

async function ReportsPage() {
  const [tasksData, docsData, reportsData] = await Promise.all([
    getTasks(),
    getDocumentation(),
    getReports(),
  ]);

  return (
    // TODO repeated box here, same as homepage , maybe make a refactor
    <Box className="flex flex-col w-full xl:w-[85%] xl:h-[90%] mx-auto p-4 md:p-10">
      <Box className="grid grid-cols-3 grid-rows-6 h-full gap-x-20 gap-y-8">
        <Box className="col-start-1 col-span-1 row-start-1 row-span-6">
          <InvoicePreview />
        </Box>

        <Box className="col-start-2 col-span-1 row-start-1 row-span-1">
          <PageTitle
            title="Company Reports"
            description={REPORTS_PAGE_DESCRIPTION}
          />
        </Box>

        <Box className="col-start-2 col-span-1 row-start-2 row-span-5">
          <DeadlinesList tasksData={tasksData} />
        </Box>

        <Box className="col-start-3 col-span-1 row-span-2">
          <ReportsList reportsData={reportsData} />
        </Box>

        <Box className="col-start-3 col-span-1 row-span-2">
          <DocsList docsData={docsData} />
        </Box>

        <Box className="col-start-3 col-span-1 row-span-2">
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
