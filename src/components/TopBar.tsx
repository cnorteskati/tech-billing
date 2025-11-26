import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ThemeToggle from '@/components/ThemeToggle';
import Image from 'next/image';
import logo from '@/app/icon.svg';

export default function TopBar() {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar className="flex justify-between">
          {/* Left Box */}
          <Box className="flex items-center-safe">
            <Image
              src={logo}
              alt="Tech Billing Logo"
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
            />
            <h5 className="text-2xl ml-2">Tech Billing</h5>
          </Box>

          {/* Right Box */}
          <Box>
            <ThemeToggle />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Spacing for the AppBar, makes the next elements go below it, instead of behind */}
      <Toolbar />
    </>
  );
}
