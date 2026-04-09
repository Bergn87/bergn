import type { Metadata } from 'next'
import { Paintbrush, Ruler, Users } from 'lucide-react'
import ServiceLandingTemplate from '@/components/marketing/ServiceLandingTemplate'

export const metadata: Metadata = {
  title: 'Maler-beregner til din hjemmeside | Bergn.dk',
  description: 'Lad dine kunder beregne pris på malerarbejde online. Du modtager leads med m², overfladetyper og kontaktoplysninger.',
}

export default function MalerPage() {
  return (
    <ServiceLandingTemplate
      service="Malerarbejde"
      headline="Lad dine kunder beregne prisen"
      headlineAccent="på malerarbejde selv"
      subtext="Sæt en beregner på din hjemmeside der beregner pris ud fra m² og overfladetyper. Du modtager kvalificerede leads med alle detaljer."
      benefits={[
        { icon: Paintbrush, title: 'Din prisliste, din beregner', desc: 'Sæt priser for indvendig maling, udvendig maling, træværk og lofter. Beregneren bruger dine priser.' },
        { icon: Ruler, title: 'M²-baseret beregning', desc: 'Kunden angiver areal og overfladetyper. Beregneren beregner prisen automatisk ud fra dine satser.' },
        { icon: Users, title: 'Leads med alle detaljer', desc: 'Hver forespørgsel indeholder areal, overfladetyper, antal lag og kontaktoplysninger. Klar til opfølgning.' },
      ]}
      faqItems={[
        { q: 'Kan jeg have separate priser for ind- og udvendig maling?', a: 'Ja. Du opsætter selv dine prisgrupper og satser. Beregneren viser de valgmuligheder du har defineret.' },
        { q: 'Kan kunden vælge antal lag maling?', a: 'Ja. Du bestemmer om beregneren skal have 2 eller 3 lag som standard, og om kunden kan vælge.' },
        { q: 'Kan jeg have beregneren på flere sider?', a: 'Ja. Med Pro-planen kan du have op til 3 beregnere — f.eks. en for indvendig og en for udvendig maling.' },
      ]}
    />
  )
}
