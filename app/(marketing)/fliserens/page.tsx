import type { Metadata } from 'next'
import { Droplets, Users, Clock } from 'lucide-react'
import ServiceLandingTemplate from '@/components/marketing/ServiceLandingTemplate'

export const metadata: Metadata = {
  title: 'Fliserens-beregner til din hjemmeside | Bergn.dk',
  description: 'Lad dine kunder beregne pris på fliserens direkte på din hjemmeside. Du modtager leads med alle detaljer.',
}

export default function FliserensPage() {
  return (
    <ServiceLandingTemplate
      service="Fliserens"
      headline="En fliserens-beregner"
      headlineAccent="på din hjemmeside"
      subtext="Dine kunder beregner selv prisen på fliserens af terrasse, indkørsel eller fliser. Du modtager forespørgslen med areal, type og kontaktoplysninger."
      benefits={[
        { icon: Droplets, title: 'Tilpasset dine ydelser', desc: 'Sæt priser for forskellige flisetyper, imprægnering og tillæg. Beregneren afspejler din prisliste.' },
        { icon: Users, title: 'Leads der er klar til opkald', desc: 'Hver forespørgsel indeholder kundens adresse, areal, flisetype og telefonnummer. Du ringer op — ikke omvendt.' },
        { icon: Clock, title: 'Spar tid på prisforespørgsler', desc: 'I stedet for at bruge 20 minutter på telefonen per forespørgsel, lader du beregneren gøre arbejdet.' },
      ]}
      faqItems={[
        { q: 'Kan mine kunder vælge mellem forskellige flisetyper?', a: 'Ja. Du opsætter selv de flisetyper du arbejder med og sætter priserne. Kunden vælger i beregneren.' },
        { q: 'Virker det for både terrasser og indkørsler?', a: 'Ja. Beregneren er fleksibel — du bestemmer selv hvilke ydelser og arealer der kan beregnes.' },
        { q: 'Hvad hvis kunden har specielle ønsker?', a: 'Kunden kan tilføje en besked til forespørgslen. Du får den sammen med de beregnede data.' },
      ]}
    />
  )
}
