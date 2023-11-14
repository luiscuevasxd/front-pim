import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { categories, status, typeStock } from 'src/app/constants';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent {
  categories = categories;
  status = status;
  typeStocks = typeStock;
  constructor(private formBuilder: FormBuilder) {}

  filters = this.formBuilder.group({
    status: [''],
    category: [''],
    typeStock: [''],
  });

  @Output() onFilter = new EventEmitter();

  handleFilter() {
    console.log('entre');
    this.onFilter.emit(this.filters.value);
  }

  changeFilter() {
    console.log('hello');
    setTimeout(() => this.handleFilter(), 100);
  }
}
