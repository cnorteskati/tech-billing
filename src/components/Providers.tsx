"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { StyledEngineProvider } from "@mui/material/styles";
import MUIThemeAdapter from "@/components/MUIThemeAdapter";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AppRouterCacheProvider>
            <StyledEngineProvider injectFirst>
                {/* next-themes provider handles the 'dark' class on <html> */}
                <NextThemesProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <MUIThemeAdapter>{children}</MUIThemeAdapter>
                </NextThemesProvider>
            </StyledEngineProvider>
        </AppRouterCacheProvider>
    );
}
