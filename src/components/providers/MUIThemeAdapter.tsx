"use client";

import { CssBaseline } from "@mui/material";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { darkTheme, lightTheme } from "@/lib/theme";

function MUIThemeAdapter({ children }: { children: React.ReactNode }) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch by only rendering after mount
    useEffect(() => {
        // ! ingnore warning because, in this case it is necessary and not very dangerous
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <MUIThemeProvider
            theme={resolvedTheme === "dark" ? darkTheme : lightTheme}
        >
            <CssBaseline />
            {children}
        </MUIThemeProvider>
    );
}

export default MUIThemeAdapter;
