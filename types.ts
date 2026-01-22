
export interface PCGAccount {
  code: string;
  label: string;
  category: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum TVARate {
  NORMAL = 0.20,
  INTERMEDIATE = 0.10,
  REDUCED = 0.055,
  SUPER_REDUCED = 0.021
}

export interface CalculationResult {
  ht: number;
  tva: number;
  ttc: number;
  rate: number;
}
