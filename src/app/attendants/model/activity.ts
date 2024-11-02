export interface Activity {
    id: string;
    name: string;
    description: string;
    photo: string;
    location: string;
    tags: string[];
    fechas_eventos: string[]; 
    
    tickets: Ticket[];
    businessId: string;
  }
  
  export interface Ticket {
    name: string;
    color: string;
    quantity: number;
    price: number;
  }
  