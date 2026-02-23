import type { Language } from '../../types';

export type PricingPlanId = 'CORE' | 'DOMINION' | 'PRESTIGE';

export interface PricingPlanData {
  id: PricingPlanId;
  name: string;
  price: string;
  icon: 'zap' | 'globe' | 'crown';
  tag: string;
  specs: {
    throughput: string;
    latency: string;
    security: string;
  };
  features: string[];
  desc: string;
  featured?: boolean;
  cta: {
    it: string;
    en: string;
  };
}

export interface PricingPlanView extends Omit<PricingPlanData, 'cta'> {
  ctaLabel: string;
}

export const getPricingPlans = (lang: Language): PricingPlanView[] => {
  const basePlans: PricingPlanData[] = [
    {
      id: 'CORE',
      name: 'KREA CORE',
      price: '599',
      icon: 'zap',
      tag: 'ESSENTIAL POWER',
      specs: { throughput: '1.2 GB/s', latency: '0.4s', security: 'Standard' },
      features: [
        "UI/UX d'Eccellenza",
        'SEO Fondamentale',
        'Cloud Hosting Global',
        'Performance Ready'
      ],
      cta: {
        it: 'ATTIVA CORE',
        en: 'ACTIVATE CORE'
      },
      desc: "La base d'acciaio per brand che necessitano di velocità e impatto immediato."
    },
    {
      id: 'DOMINION',
      name: 'KREA DOMINION',
      price: '1499',
      icon: 'globe',
      tag: 'STRATEGIC SCALE',
      featured: true,
      specs: { throughput: '4.8 GB/s', latency: '0.1s', security: 'Fortified' },
      features: [
        'Multilingua Global',
        'SEO Internazionale',
        'Conversion Engine',
        'Supporto Prioritario'
      ],
      cta: {
        it: 'SCALA IL MERCATO',
        en: 'SCALE THE MARKET'
      },
      desc: "Il gold standard per l'espansione globale e la conversione massiva."
    },
    {
      id: 'PRESTIGE',
      name: 'KREA PRESTIGE',
      price: '2199',
      icon: 'crown',
      tag: 'ELITE EXPERIENCE',
      specs: { throughput: 'UNLIMITED', latency: 'ULTRA', security: 'Quantum' },
      features: [
        'Design Cinematico 3D',
        'Moduli AI Custom',
        'Scalabilità Infinita',
        'Exclusive Brand Assets'
      ],
      cta: {
        it: 'SBLOCCA PRESTIGIO',
        en: 'UNLOCK PRESTIGE'
      },
      desc: "L'apice dell'ingegneria digitale per chi non accetta limiti alla visione."
    }
  ];

  return basePlans.map((plan) => ({
    id: plan.id,
    name: plan.name,
    price: plan.price,
    icon: plan.icon,
    tag: plan.tag,
    specs: plan.specs,
    features: plan.features,
    desc: plan.desc,
    featured: plan.featured,
    ctaLabel: lang === 'it' ? plan.cta.it : plan.cta.en
  }));
};

