'use client';

import FileListItem from '@/components/requirements/FileListItem';
import RequirementList from '@/components/requirements/RequirementList';
import { DocumentItem } from '@/types/companyData';
import { useState } from 'react';

type DocsListProps = {
  docsData: DocumentItem[];
};

function DocsList({ docsData }: DocsListProps) {
  const [docs, setDocs] = useState(docsData);

  const toggleDoc = (id: string) => {
    setDocs((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <RequirementList title="Docs" color="blue">
      {docs.map((t) => (
        <FileListItem
          key={t.id}
          {...t}
          type="documentation"
          onToggle={toggleDoc}
        />
      ))}
    </RequirementList>
  );
}

export default DocsList;
