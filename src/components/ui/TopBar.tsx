import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ThemeToggle from '@/components/ui/ThemeToggle';
import LogoLinkButton from '@/components/ui/LogoLinkButton';

export default function TopBar() {
  return (
    <>
      <AppBar position="fixed" className="flex justify-center">
        <Toolbar className="flex justify-between">
          {/* Left Box */}
          <Box className="flex items-center-safe">
            <LogoLinkButton />
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
