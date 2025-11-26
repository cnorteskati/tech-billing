import 'server-only'; // the following is only allowed to be called on server-side

import fs from 'fs/promises';
import path from 'path';
import { unstable_cache } from 'next/cache';
import {
  ActiveUser,
  BillsData,
  CompanyData,
  DocumentItem,
  ReportItem,
  RevenueData,
  TaskItem,
} from '@/types/companyData';

const CACHE_REVALIDATION_SECONDS = 30;
const COMPANY_DATA_CACHE_KEY = 'global-company-data';
const DASHBOARD_TAG = 'dashboard';

const DATA_FILE_REL_PATH = 'src/data/data.json';

/**
 * Internal function to retrieve the actual data.
 * @returns a promise of the data.
 */
const _readDatabaseFile = async (): Promise<CompanyData> => {
  try {
    const filePath = path.join(process.cwd(), DATA_FILE_REL_PATH);
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents) as CompanyData;
  } catch (error) {
    console.error('CRITICAL ERROR: Failed to read data.json', error);
    throw new Error('Failed to fetch company data');
  }
};

/**
 * Cached getter for the data, revalidates every {CACHE_REVALIDATION_SECONDS}
 */
export const getGlobalData = unstable_cache(
  _readDatabaseFile,
  [COMPANY_DATA_CACHE_KEY], // Cache Key
  {
    revalidate: CACHE_REVALIDATION_SECONDS,
    tags: [DASHBOARD_TAG],
  }
);

export const getRevenue = async (): Promise<RevenueData> => {
  const data = await getGlobalData();
  return data.revenue;
};

export const getBills = async (): Promise<BillsData> => {
  const data = await getGlobalData();
  return data.bills;
};

export const getActiveUsers = async (): Promise<ActiveUser[]> => {
  const data = await getGlobalData();
  return data.activeUsers;
};

export const getReports = async (): Promise<ReportItem[]> => {
  const data = await getGlobalData();
  return data.reports;
};

export const getDocumentation = async (): Promise<DocumentItem[]> => {
  const data = await getGlobalData();
  return data.documentation;
};

export const getTasks = async (): Promise<TaskItem[]> => {
  const data = await getGlobalData();
  return data.tasks;
};
