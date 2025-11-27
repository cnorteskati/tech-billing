'use client';

import { useDrawingArea } from '@mui/x-charts/hooks';

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();

  return (
    <text
      x={left + width / 2}
      y={top + height / 2}
      // SVG Alignment Props (Best passed as attributes in React)
      textAnchor="middle"
      dominantBaseline="central"
      className="fill-current"
      fontSize={'100%'}
    >
      {children}
    </text>
  );
}

export default PieCenterLabel;
