import { ReactNode } from 'react';
import { Card, Box, Typography, useTheme } from '@mui/material';

type ListColor = 'emerald' | 'blue' | 'red' | 'amber' | 'purple';

interface RequirementListProps {
  title: string;
  /**
   * Color for the indicator strip next to the title.
   * Maps to Tailwind background colors.
   */
  color: ListColor;
  /**
   * The list content (usually a list of DocumentItem or TaskItem).
   */
  children: ReactNode;
  /**
   * Optional right-side header content (e.g., "5/10 Done" badge).
   */
  headerAction?: ReactNode;
  /**
   * Additional classes for the container (e.g., height or margin adjustments).
   */
  className?: string;
}

// Map the prop strings to actual MUI Palette paths
const colorMap: Record<ListColor, string> = {
  emerald: 'success.main',
  blue: 'info.main',
  red: 'error.main',
  amber: 'warning.main',
  purple: 'secondary.main',
};

export default function RequirementList({
  title,
  color,
  children,
  headerAction,
  className = '',
}: RequirementListProps) {
  const theme = useTheme();
  const indicatorColor = colorMap[color];

  return (
    <Card
      className={`h-full flex flex-col ${className}`}
      sx={{
        borderRadius: 4,
        boxShadow: theme.shadows[1],
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      {/* Header Section */}
      <div className="p-6 pb-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          {/* Color Indicator Pill */}
          <Box
            className="w-1.5 h-6 rounded-full"
            sx={{ bgcolor: indicatorColor }}
            aria-hidden="true"
          />
          <Typography variant="h6" fontWeight="bold" color="text.primary">
            {title}
          </Typography>
        </div>
        {headerAction && <div>{headerAction}</div>}
      </div>

      {/* Scrollable Content Area */}
      <Box
        className="flex-1 overflow-y-auto px-4 pb-4 flex flex-col gap-2"
        sx={{
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.action.hover,
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: theme.palette.action.selected,
          },
        }}
      >
        {children}
      </Box>
    </Card>
  );
}
