'use client';

import { useState } from 'react';
import { Box, Divider, Typography, useTheme, Card } from '@mui/material';
import { Business } from '@mui/icons-material';
import InvoicePreviewInputs from '@/components/requirements/InvoicePreviewInputs';

export type InvoiceData = {
  customerName: string;
  service: string;
  amount: number;
  dueDate: string;
};

const COMPANY_NAME = 'Tech Billing';
const COMPANY_ADDR = '123 Tech Avenue, Innovation City';
const TAX_PERCENT = 23;

export const SERVICES = [
  { value: 'cloud-infra', label: 'Cloud Infrastructure Management' },
  { value: 'saas-enterprise', label: 'SaaS Subscription - Enterprise Tier' },
  { value: 'consulting', label: 'Technical Consulting Services' },
  { value: 'security-audit', label: 'Quarterly Security Audit' },
  { value: 'custom-dev', label: 'Custom Feature Development' },
];

const INITIAL_DATA: InvoiceData = {
  customerName: 'Acme Corp',
  service: 'saas-enterprise',
  amount: 4500.0,
  dueDate: '2025-12-15',
};

export default function InvoicePreview() {
  const theme = useTheme();
  const [data, setData] = useState<InvoiceData>(INITIAL_DATA);

  const handleChange =
    (field: keyof InvoiceData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-IE', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);

  const getServiceLabel = (value: string) =>
    SERVICES.find((s) => s.value === value)?.label || value;

  return (
    <div className="flex flex-col h-full gap-4">
      {/* === Preview Viusalization  === */}
      <Card
        className="flex-1 rounded-2xl border shadow-sm overflow-hidden flex flex-col min-h-0"
        sx={{
          bgcolor: 'background.paper',
          borderColor: 'divider',
          borderRadius: 2,
        }}
      >
        <Box
          className="p-6 md:p-8 flex flex-col gap-6 flex-1 overflow-y-auto"
          sx={{ bgcolor: 'action.hover' }}
        >
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <Box
                className="p-2 rounded-lg"
                sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}
              >
                <Business />
              </Box>
              <div>
                <Typography variant="h6" fontWeight="bold">
                  {COMPANY_NAME}
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  color="text.secondary"
                >
                  {COMPANY_ADDR}
                </Typography>
              </div>
            </div>
            <div className="text-right">
              <Typography variant="h6" fontWeight="bold">
                INVOICE
              </Typography>
            </div>
          </div>

          <Divider />

          {/* Bill To & Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <Typography
                variant="caption"
                fontWeight="bold"
                color="text.secondary"
                className="uppercase"
              >
                Bill To
              </Typography>
              <Typography variant="body1" fontWeight="medium" className="mt-1">
                {data.customerName || 'Customer Name'}
              </Typography>
            </div>
            <div className="sm:text-right">
              <Typography
                variant="caption"
                fontWeight="bold"
                color="text.secondary"
                className="uppercase"
              >
                Details
              </Typography>
              <div className="mt-1 space-y-1">
                <Typography variant="body2">
                  <span className="text-gray-400 mr-2">Issued:</span>
                  {new Date().toLocaleDateString()}
                </Typography>
                <Typography variant="body2">
                  <span className="text-gray-400 mr-2">Due:</span>
                  {data.dueDate}
                </Typography>
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <Box
            sx={{
              bgcolor: 'background.paper',
              borderRadius: 2,
              overflow: 'hidden',
              border: 1,
              borderColor: 'divider',
              flexGrow: 1,
            }}
          >
            <Box
              className="p-3 border-b grid grid-cols-12 gap-4"
              sx={{ bgcolor: 'action.selected' }}
            >
              <Typography
                variant="caption"
                fontWeight="bold"
                className="col-span-8 uppercase text-gray-400"
              >
                Description
              </Typography>
              <Typography
                variant="caption"
                fontWeight="bold"
                className="col-span-4 text-right uppercase text-gray-400"
              >
                Amount
              </Typography>
            </Box>
            <div className="p-4 grid grid-cols-12 gap-4 items-center">
              <div className="col-span-8">
                <Typography variant="body2" fontWeight="medium">
                  {getServiceLabel(data.service)}
                </Typography>
              </div>
              <Typography
                variant="body2"
                fontWeight="bold"
                className="col-span-4 text-right"
              >
                {formatCurrency(Number(data.amount))}
              </Typography>
            </div>
          </Box>

          {/* Totals */}
          <div className="flex justify-end mt-auto">
            <div className="w-full sm:w-1/2 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Subtotal</span>
                <span>{formatCurrency(Number(data.amount))}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Tax ({TAX_PERCENT}%)</span>
                <span>
                  {formatCurrency((Number(data.amount) * TAX_PERCENT) / 100)}
                </span>
              </div>
              <Divider />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span style={{ color: theme.palette.primary.main }}>
                  {formatCurrency(
                    Number(data.amount) * (1 + TAX_PERCENT / 100)
                  )}
                </span>
              </div>
            </div>
          </div>
        </Box>
      </Card>

      {/* === Customize Inputs Box === */}
      <InvoicePreviewInputs
        data={data}
        handleDueDateChange={handleChange('dueDate')}
        handleServiceChange={handleChange('service')}
        handleCustomerNameChange={handleChange('customerName')}
        handleAmountChange={handleChange('amount')}
      />
    </div>
  );
}
