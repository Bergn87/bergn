import type { Metadata } from 'next'
import { Sparkles, Building2, Users } from 'lucide-react'
import ServiceLandingTemplate from '@/components/marketing/ServiceLandingTemplate'

export const metadata: Metadata = {
  title: 'Vinduespolerings-beregner til din hjemmeside | Bergn.dk',
  description: 'Giv dine kunder en beregner til vinduespolering. De beregner prisen — du modtager leads med antal vinduer og kontaktoplysninger.',
}

export default function VinduesPage() {
  return (
    <ServiceLandingTemplate
      service="Vinduespolering"
      headline="En vinduespolerings-beregner"
      headlineAccent="der genererer leads"
      subtext="Dine kunder angiver antal vinduer og etager. Beregneren beregner prisen ud fra dine satser. Du modtager forespørgslen med alle detaljer."
      benefits={[
        { icon: Sparkles, title: 'Kunden gør arbejdet', desc: 'I stedet for telefonopkald og emails beregner kunden selv prisen på din hjemmeside. Du sparer tid på hvert lead.' },
        { icon: Building2, title: 'Pris per etage og vinduestype', desc: 'Sæt forskellige priser for stueetage, 1. sal og ovenlysvinduer. Beregneren håndterer det hele.' },
        { icon: Users, title: 'Flere leads, mindre admin', desc: 'Beregneren kører 24/7. Du modtager leads med adresse, antal vinduer og telefonnummer — klar til opfølgning.' },
      ]}
      faqItems={[
        { q: 'Kan jeg have priser for både privat og erhverv?', a: 'Ja. Du kan opsætte flere beregnere med forskellige priser — en for privat og en for erhverv.' },
        { q: 'Kan kunden vælge mellem indvendig og udvendig?', a: 'Ja. Du bestemmer selv hvilke valgmuligheder beregneren viser. Det hele styres fra dit admin-panel.' },
        { q: 'Hvad koster det?', a: 'Bergn starter fra 299 kr/md. Du kan prøve gratis i 14 dage uden kreditkort.' },
      ]}
    />
  )
}
