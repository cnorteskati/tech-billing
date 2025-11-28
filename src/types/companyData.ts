export type MonthlyRevenue = {
  month: string;
  euros: number;
};

export type YearlyRevenue = {
  year: string;
  euros: number;
};

export type RevenueData = {
  monthly: MonthlyRevenue[];
  yearly: YearlyRevenue[];
};

export type BillBreakdown = {
  status: 'completed' | 'pending' | 'processing' | 'canceled';
  count: number;
};

export type BillsData = {
  total: number;
  breakdown: BillBreakdown[];
};

export type ActiveUser = {
  month: string;
  count: number;
};

export type ReportItem = {
  id: string;
  title: string;
  completed: boolean;
};

export type DocumentItem = {
  id: string;
  title: string;
  completed: boolean;
};

export type TaskItem = {
  id: string;
  task: string;
  date: string;
  urgency: 'High' | 'Medium' | 'Low';
  completed: boolean;
};

// The Root Data Type of the company
export type CompanyData = {
  revenue: RevenueData;
  bills: BillsData;
  activeUsers: ActiveUser[];
  reports: ReportItem[];
  documentation: DocumentItem[];
  tasks: TaskItem[];
};
