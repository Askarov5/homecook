import { Metadata } from 'next'
import TermsOfService from './components/TermsOfService'

export const metadata: Metadata = {
    title: 'Terms of Service | HomeCook',
    description: 'Read our Terms of Service to understand your rights and responsibilities when using the HomeCook platform.',
}

export default function TermsOfServicePage() {
    return (
        <>
            <TermsOfService />
        </>
    )
}

