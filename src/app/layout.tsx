import './globals.css';
import ClientProviders from '@/components/ClientProviders';

export const metadata = {
    title: 'ContentHub - Personalized Dashboard',
    description: 'Advanced Interaction Dashboard'
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className='antialiased transition-colors duration-300'>
                <ClientProviders>
                    {children}
                </ClientProviders>
            </body>
        </html>
    )
}