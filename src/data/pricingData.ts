import type { Language } from '../../types';

export type PricingPlanId = 'CORE' | 'SYSTEM' | 'AUTONOMY' | 'SPOT';

export interface PricingPlanData {
  id: PricingPlanId;
  name: string;
  icon: 'zap' | 'globe' | 'crown' | 'wrench';
  tag: string;
  setupFee: string;
  monthlyFee?: string;
  features: string[];
  desc: string;
  featured?: boolean;
  cta: { it: string; en: string };
}

export interface PricingPlanView extends Omit<PricingPlanData, 'cta'> {
  ctaLabel: string;
}

export const getPricingPlans = (lang: Language): PricingPlanView[] => {
  const basePlans: PricingPlanData[] = [
    {
      id: 'CORE',
      name: 'KREA CORE',
      icon: 'zap',
      tag: 'ESSENTIAL POWER',
      setupFee: '€ 999',
      monthlyFee: '€ 69 – € 99 /mese',
      features: [
        'Frontend ultra-veloce (React)',
        'Database Supabase (raccolta lead)',
        '1/2/3 Workflow base (Notifica Telegram, Scanner, Calendario...)',
        'Hosting incluso',
      ],
      desc: 'La base operativa ultra-veloce per catturare lead.',
      cta: { it: 'ATTIVA CORE', en: 'ACTIVATE CORE' },
    },
    {
      id: 'SYSTEM',
      name: 'KREA SYSTEM',
      icon: 'globe',
      tag: 'FULL SYSTEM',
      featured: true,
      setupFee: '€ 1.799',
      monthlyFee: '€ 99 – € 149 /mese',
      features: [
        'Tutto ciò che è in Core',
        'E-Commerce con Compliance Fiscale Globale (MoR via Lemon Squeezy)',
        'Monitoraggio proattivo "Morning Brief"',
        'Supporto Prioritario',
      ],
      desc: 'Il sistema completo per vendere a livello globale in automatico.',
      cta: { it: 'SCALA IL MERCATO', en: 'SCALE THE MARKET' },
    },
    {
      id: 'AUTONOMY',
      name: 'KREA AUTONOMY',
      icon: 'crown',
      tag: 'ENTERPRISE',
      setupFee: 'Da € 2.499 a € 9.999',
      monthlyFee: '€ 199 – € 499 /mese',
      features: [
        'Tutto ciò che è in System',
        'Supporto Prioritario 24/7',
        'Infrastruttura W.A.T. completa',
        'Agenti Illimitati',
        'Database Replicato Multi-Region (latenza zero)',
        'SLA Garantito 99.99%',
      ],
      desc: 'Il livello Enterprise per volumi di traffico estremi e automazione totale.',
      cta: { it: 'SBLOCCA AUTONOMY', en: 'UNLOCK AUTONOMY' },
    },
    {
      id: 'SPOT',
      name: 'INTERVENTI SPOT',
      icon: 'wrench',
      tag: 'ON DEMAND',
      setupFee: '€ 200 – € 500 – € 1.000',
      features: [
        'Valido per siti senza abbonamento mensile attivo',
        'Lavori su siti già esistenti (non sviluppati con stack KREA)',
        'Prezzo a prestazione',
      ],
      desc: 'Soluzioni per progetti legacy o senza retainer.',
      cta: { it: 'RICHIEDI INTERVENTO', en: 'REQUEST SERVICE' },
    },
  ];

  return basePlans.map((plan) => ({
    id: plan.id,
    name: plan.name,
    icon: plan.icon,
    tag: plan.tag,
    setupFee: plan.setupFee,
    monthlyFee: plan.monthlyFee,
    features: plan.features,
    desc: plan.desc,
    featured: plan.featured,
    ctaLabel: lang === 'it' ? plan.cta.it : plan.cta.en,
  }));
};
