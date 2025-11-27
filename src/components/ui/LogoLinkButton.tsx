'use client';

import { Box, IconButton } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/app/icon.svg';

/**
 * Its a Company Logo button that takes the user to the root page '/'
 * @returns the React Component
 */
function LogoLinkButton() {
  return (
    <Box className="flex items-center-safe">
      <IconButton component={Link} href="/">
        <Image
          src={logo}
          alt="Tech Billing Logo"
          className="w-10 h-10 object-contain"
        />
      </IconButton>
    </Box>
  );
}

export default LogoLinkButton;
