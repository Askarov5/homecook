import './global.css'
import Header from './components/Header'
import Footer from './components/Footer'

import { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <div className="min-h-screen bg-beige-50 flex flex-col">
                    <Header />
                    <main className="flex-grow">
                        {children}
                    </main>
                    <Footer />
                </div>
            </body>
        </html>
    )
}

