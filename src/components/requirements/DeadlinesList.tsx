'use client';

import RequirementList from '@/components/requirements/RequirementList';
import TaskListItem from '@/components/requirements/TaskListItem';
import { TaskItem } from '@/types/companyData';
import { useState } from 'react';

type DeadlinesListProps = {
  tasksData: TaskItem[];
};

function DeadlinesList({ tasksData }: DeadlinesListProps) {
  const [tasks, setTasks] = useState(tasksData);

  const toggleTaskCompeleted = (id: string) => {
    setTasks((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <RequirementList title="Deadlines" color="red">
      {tasks.map((t) => (
        <TaskListItem key={t.id} {...t} onToggle={toggleTaskCompeleted} />
      ))}
    </RequirementList>
  );
}

export default DeadlinesList;
