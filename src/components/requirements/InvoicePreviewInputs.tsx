import {
  InvoiceData,
  SERVICES,
} from '@/components/requirements/InvoicePreview';
import { Card, MenuItem, TextField, Typography, useTheme } from '@mui/material';

type InvoicePreviewInputsProps = {
  data: InvoiceData;
  handleDueDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleServiceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCustomerNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function InvoicePreviewInputs({
  data,
  handleAmountChange,
  handleCustomerNameChange,
  handleDueDateChange,
  handleServiceChange,
}: InvoicePreviewInputsProps) {
  const theme = useTheme();
  return (
    <Card
      className="p-6 md:p-8"
      sx={{
        borderRadius: 4,
        boxShadow: theme.shadows[1],
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography variant="h6" fontWeight="bold" className="mb-6">
        Customize Invoice
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <TextField
          label="Due Date"
          type="date"
          size="small"
          value={data.dueDate}
          onChange={handleDueDateChange}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          label="Customer Name"
          size="small"
          value={data.customerName}
          onChange={handleCustomerNameChange}
        />
        <TextField
          select
          label="Service"
          size="small"
          value={data.service}
          onChange={handleServiceChange}
        >
          {SERVICES.map((s) => (
            <MenuItem key={s.value} value={s.value}>
              {s.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Amount"
          type="number"
          size="small"
          value={data.amount}
          onChange={handleAmountChange}
          slotProps={{
            input: {
              startAdornment: <span className="mr-1 text-gray-500">€</span>,
            },
          }}
        />
      </div>
    </Card>
  );
}

export default InvoicePreviewInputs;
