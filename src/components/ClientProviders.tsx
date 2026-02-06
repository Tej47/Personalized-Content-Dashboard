'use client'; // This directive is the key fix

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Providers as ReduxProvider } from '@/store/provider';
import ThemeProvider from '@/components/ThemeProvider';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <ReduxProvider>
            <ThemeProvider>
                <DndProvider backend={HTML5Backend}>
                    {children}
                </DndProvider>
            </ThemeProvider>
        </ReduxProvider>
    );
}