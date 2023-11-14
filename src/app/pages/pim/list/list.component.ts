import { Component, OnInit } from '@angular/core';
import { ProductApiService } from '../../../services/pim/api.service';
import { IProduct, Statistic } from '../../../interfaces/IProduct';
import { IPaginationMetadata } from 'src/app/interfaces/IPagination';
import { Subject } from 'rxjs';
import {
  faPenToSquare as faEdit,
  faTrashCan,
  faPlus,
  faHome,
  faGamepad,
  faGem,
  faShoePrints,
  faBriefcase,
  faMobileScreenButton,
} from '@fortawesome/free-solid-svg-icons';
import { categories, status } from 'src/app/constants';

type Filter = {
  searchValue?: string;
  category?: string;
  status?: string;
  typeStock?: string;
};

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ProductListComponent implements OnInit {
  faPlus = faPlus;
  faEdit = faEdit;
  faTrashCan = faTrashCan;
  products: IProduct[] = [];
  filters: IPaginationMetadata & Filter = {
    page: 0,
    per_page: 10,
    count: 10,
  };
  showModalProduct = false;
  statistics: Statistic | undefined;
  productId: Subject<string> = new Subject<string>();

  constructor(private productApiService: ProductApiService) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getInfoCategory(category: string): any {
    return categories.find((item) => item.id === category);
  }

  getInfoStatus(value: string) {
    return status.find((item) => item.id === value);
  }

  getAllProducts(params?: Partial<Filter & IPaginationMetadata>): void {
    this.productApiService
      .getAllProducts({ ...this.filters, ...params })
      .subscribe((response) => {
        this.products = response.data;
        this.filters = { ...this.filters, ...params, ...response.meta_data };
      });
    this.productApiService.StatisticsProduct().subscribe((response) => {
      this.statistics = response;
    });
  }

  deleteProduct(productId: string) {
    this.productApiService.deleteProduct(productId).subscribe({
      complete: () => {
        this.getAllProducts(this.filters);
      },
      error: ({ error }) => alert(error.error_message),
    });
  }

  handleProductPopup(active: boolean) {
    this.showModalProduct = active;
  }

  totalPages(): number[] {
    return new Array(Math.ceil(this.filters?.count / this.filters?.per_page));
  }

  handleEdit(productId: string) {
    this.productId.next(productId);
    this.handleProductPopup(true);
  }

  handlePage(page: number) {
    this.getAllProducts({ ...this.filters, page });
  }

  changeTypeStock(productId: string) {
    this.productApiService.changeStockProduct(productId).subscribe({
      complete: () => {
        this.getAllProducts(this.filters);
      },
      error: ({ error }) => alert(error.error_message),
    });
  }

  searchProducts(event: any) {
    this.getAllProducts({
      searchValue: event.target?.value ?? '',
    });
  }
}
