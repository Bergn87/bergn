import type { Metadata } from 'next'
import { Home, Users, TrendingUp } from 'lucide-react'
import ServiceLandingTemplate from '@/components/marketing/ServiceLandingTemplate'

export const metadata: Metadata = {
  title: 'Tagrens-beregner til din hjemmeside | Bergn.dk',
  description: 'Giv dine kunder en prisberegner til tagrens og tagmaling. BBR-data hentes automatisk. Du modtager kvalificerede leads.',
}

export default function TagrensPage() {
  return (
    <ServiceLandingTemplate
      service="Tagrens & Tagmaling"
      headline="Giv dine kunder en tagrens-beregner"
      headlineAccent="der sælger for dig"
      subtext="Dine kunder indtaster deres adresse, beregneren henter BBR-data og beregner prisen automatisk. Du modtager et færdigt lead med alle detaljer."
      benefits={[
        { icon: Home, title: 'BBR-data gør arbejdet', desc: 'Beregneren henter tagtype, areal og hældning fra BBR automatisk. Dine kunder slipper for at gætte — og du får præcise data.' },
        { icon: Users, title: 'Kvalificerede leads', desc: 'Hver forespørgsel indeholder adresse, tagdata, prisoverslag og kontaktoplysninger. Klar til at du ringer op.' },
        { icon: TrendingUp, title: 'Flere tilbud, mindre arbejde', desc: 'Stop med at bruge timer på at beregne priser manuelt. Beregneren gør det for dig — 24/7 på din hjemmeside.' },
      ]}
      faqItems={[
        { q: 'Kan jeg sætte mine egne priser?', a: 'Ja. Du styrer selv pris per m² for hver tagtype, tillæg for hældning, højde, ovenlysvinduer og alt andet. Du kan ændre priserne når som helst.' },
        { q: 'Hvordan kommer beregneren på min hjemmeside?', a: 'Du kopierer en embed-kode og indsætter den på din side. Virker med WordPress, Wix, Squarespace og alle andre platforme.' },
        { q: 'Hvad modtager jeg når en kunde udfylder beregneren?', a: 'Du får en email med kundens navn, telefon, adresse, tagdata fra BBR og det beregnede prisoverslag. Alt samlet i dit admin-panel.' },
        { q: 'Kan jeg tilpasse beregneren med mit logo?', a: 'Ja. Du uploader dit logo og vælger din primærfarve. Beregneren ser ud som en del af din hjemmeside.' },
      ]}
    />
  )
}
