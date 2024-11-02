// src/app/attendants/services/event-card.ts
export interface EventCard {
    id: number;
    Imagen: string;
    Titulo: string;
    tags: string[];
    fecha:string;
    precio: number;
    tipo: 'TRENDING' | 'FEATURED' | 'DISCOVER';
  }
  