export interface CleaningReport {
  id?: string;
  accommodation: string;
  date: string;
  cleaner: string;
  guest: string;
  timeStart: string;
  timeEnd: string;
  duration: number;
  cleanliness: string[];
  hardware: string[];
  kitchenInventoried: boolean;
  kitchenOk: boolean;
  kitchenNotes: string;
  incidentSeverity: 'Normal' | 'Menor' | 'Crítico';
  incidentDetails: string;
  generalNotes: string;
  signature: string;
}
