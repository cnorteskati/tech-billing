'use client';

import FileListItem from '@/components/requirements/FileListItem';
import RequirementList from '@/components/requirements/RequirementList';
import { ReportItem } from '@/types/companyData';
import { useState } from 'react';

type ReportsListProps = {
  reportsData: ReportItem[];
};

function ReportsList({ reportsData }: ReportsListProps) {
  const [reports, setReports] = useState(reportsData);

  const toggleReport = (id: string) => {
    setReports((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <RequirementList title="Reports" color="emerald">
      {reports.map((t) => (
        <FileListItem key={t.id} {...t} type="report" onToggle={toggleReport} />
      ))}
    </RequirementList>
  );
}

export default ReportsList;
