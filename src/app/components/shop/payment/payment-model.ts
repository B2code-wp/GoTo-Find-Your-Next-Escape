// model.ts
export interface Plan {
  name: string;
  icon: string;
  monthly: number;
  annual: number;
  billing: string;
  annualBilling: string;
}

export type PlanKey = 'explorer' | 'voyager' | 'nomad';

export const plans: Record<PlanKey, Plan> = {
  explorer: {
    name: 'Explorer Plan',
    icon: 'explore',
    monthly: 10,
    annual: 99,
    billing: 'Billed monthly, cancel anytime',
    annualBilling: 'Billed annually (R99/yr), cancel anytime'
  },
  voyager: {
    name: 'Voyager Plan',
    icon: 'flight_takeoff',
    monthly: 24,
    annual: 18,
    billing: 'Billed monthly, cancel anytime',
    annualBilling: 'Billed annually (R216/yr), cancel anytime'
  },
  nomad: {
    name: 'Nomad Elite Plan',
    icon: 'workspace_premium',
    monthly: 59,
    annual: 44,
    billing: 'Billed monthly, cancel anytime',
    annualBilling: 'Billed annually (R528/yr), cancel anytime'
  }
};
