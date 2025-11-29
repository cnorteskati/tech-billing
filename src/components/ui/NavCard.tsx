'use client';

import Link from 'next/link';
import { ElementType } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  useTheme,
} from '@mui/material';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

interface NavCardProps {
  title: string;
  description: string;
  href: string;
  icon: ElementType;
}

export default function NavCard({
  title,
  description,
  href,
  icon: Icon,
}: NavCardProps) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        borderRadius: 4,
        boxShadow: theme.shadows[2],
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-1%)',
          boxShadow: theme.shadows[8],
        },
      }}
    >
      <CardActionArea
        component={Link}
        href={href}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        <CardContent
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            p: 3,
          }}
        >
          {/* Header: Title and Nav Icon */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h6"
              component="div"
              fontWeight="bold"
              color="text.primary"
            >
              {title}
            </Typography>
            <ArrowForwardRoundedIcon color="action" />
          </Box>

          {/* Central Icon Area */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              py: 2,
              color: theme.palette.primary.main,
              '& svg': { fontSize: '5rem' }, // Force the passed icon to be large
            }}
          >
            <Icon />
          </Box>

          {/* Description */}
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
