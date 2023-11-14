import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPagination, IProduct, Statistic } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  constructor(private http: HttpClient) {}

  getAllProducts(
    filters?: Record<string, string | number>
  ): Observable<IPagination<IProduct>> {
    let params: Record<string, string> = {};

    for (const key in filters) {
      if (filters?.[key]) {
        params = { ...params, [key]: String(filters[key]) };
      }
    }

    const filterParams = new URLSearchParams(params);

    return this.http.get<IPagination<IProduct>>(
      `http://localhost:4080/products?${filterParams}`
    );
  }

  getById(productId: string): Observable<IProduct> {
    return this.http.get<IProduct>(
      `http://localhost:4080/products/${productId}`
    );
  }

  create(data: Omit<IProduct, 'id'>): Observable<IProduct> {
    return this.http.post<IProduct>('http://localhost:4080/products', data);
  }

  update(data: Omit<IProduct, 'id'>): Observable<void> {
    const { _id, ...rest } = data;
    return this.http.patch<void>(`http://localhost:4080/products/${_id}`, rest);
  }

  deleteProduct(productId: string): Observable<void> {
    return this.http.delete<void>(
      `http://localhost:4080/products/${productId}`
    );
  }

  changeStockProduct(productId: string): Observable<void> {
    return this.http.post<void>(
      `http://localhost:4080/products/change-stock/${productId}`,
      {}
    );
  }

  StatisticsProduct(): Observable<Statistic> {
    return this.http.get<Statistic>(
      'http://localhost:4080/products/statistics'
    );
  }
}
