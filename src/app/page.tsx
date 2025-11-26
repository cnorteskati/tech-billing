import BillingPieChart, { PieChartItem } from '@/components/BillingPieChart';
import { getBills } from '@/lib/data-access';
import { capitalize } from '@/lib/utils';
import { Typography } from '@mui/material';

async function HomePage() {
  const defaultColor = 'grey';

  const statusColors = {
    completed: 'green',
    pending: 'orange',
    processing: 'blue',
    canceled: 'red',
  };

  const billsData = await getBills();

  // map billsData to PieChartItem elements
  const pieChartItems: PieChartItem[] = billsData.breakdown.map((b) => ({
    id: b.status,
    label: capitalize(b.status),
    value: b.count,
    color: statusColors[b.status] || defaultColor,
  }));

  return (
    <>
      <BillingPieChart items={pieChartItems} />
      <Typography>Hello</Typography>
    </>
  );
}

export default HomePage;
