import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-filter-event',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './filter-event.component.html',
  styleUrl: './filter-event.component.css'
})
export class FilterEventComponent {
  filters = {
    category: '',
    minPrice: null,
    maxPrice: null,
    startDate: '',
    endDate: ''
  };

  filterMessage: string | null = null;

  @Output() filtersChanged = new EventEmitter<any>();

  applyFilters() {
    try {
      this.filtersChanged.emit(this.filters);
      this.filterMessage = 'Filtros Aplicados';

    } catch (error) {
      this.filterMessage = 'Error al aplicar filtros';
    }
  }


}
