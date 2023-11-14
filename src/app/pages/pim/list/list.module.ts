import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListRoutingModule } from './list-routing.module';
import { ProductListComponent } from './list.component';
import { ProductRegisterComponent } from '../register/product-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FiltersComponent } from './filters/filters.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductRegisterComponent,
    FiltersComponent,
    StatisticsComponent,
  ],
  imports: [
    CommonModule,
    ProductListRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
})
export class ProductListModule {}
