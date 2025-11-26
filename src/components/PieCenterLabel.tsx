'use client';

import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

// This renders the total in the middle of the donut
const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
  fontWeight: 'bold',
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default PieCenterLabel;
