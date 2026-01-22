
import { PCGAccount, TVARate } from './types';

export const SIMPLIFIED_PCG: PCGAccount[] = [
  { code: '101', label: 'Capital social', category: 'Capitaux propres' },
  { code: '401', label: 'Fournisseurs', category: 'Tiers' },
  { code: '411', label: 'Clients', category: 'Tiers' },
  { code: '44571', label: 'TVA collectée', category: 'État' },
  { code: '44566', label: 'TVA déductible sur ABS', category: 'État' },
  { code: '512', label: 'Banque', category: 'Comptes financiers' },
  { code: '601', label: 'Achats de matières premières', category: 'Charges' },
  { code: '606', label: 'Achats non stockés de matières et fournitures', category: 'Charges' },
  { code: '607', label: 'Achats de marchandises', category: 'Charges' },
  { code: '616', label: 'Primes d\'assurances', category: 'Charges' },
  { code: '622', label: 'Honoraires', category: 'Charges' },
  { code: '641', label: 'Rémunérations du personnel', category: 'Charges' },
  { code: '701', label: 'Ventes de produits finis', category: 'Produits' },
  { code: '706', label: 'Prestations de services', category: 'Produits' },
  { code: '707', label: 'Ventes de marchandises', category: 'Produits' },
];

export const TVA_LABELS = {
  [TVARate.NORMAL]: 'Taux Normal (20%)',
  [TVARate.INTERMEDIATE]: 'Taux Intermédiaire (10%)',
  [TVARate.REDUCED]: 'Taux Réduit (5,5%)',
  [TVARate.SUPER_REDUCED]: 'Taux Super-Réduit (2,1%)',
};
