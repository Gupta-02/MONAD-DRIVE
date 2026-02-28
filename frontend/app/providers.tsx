'use client';

import React, { ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '../lib/wagmiConfig';
import { ThemeProvider } from '../lib/theme';

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider>
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </WagmiProvider>
        </ThemeProvider>
    );
}
