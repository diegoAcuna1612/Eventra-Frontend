export interface Activity {
    photo: string;
    name: string;
    tags: string[];
    fechas_eventos: { date: string; time: string }[];
    location: string;
    description: string;
    tickets: { name: string; color: string; quantity: number; price: number }[];
    businessId: string;
  }
  