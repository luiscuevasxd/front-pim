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
      `https://cx61n7blje.execute-api.us-east-1.amazonaws.com/dev/products?${filterParams}`
    );
  }

  getById(productId: string): Observable<IProduct> {
    return this.http.get<IProduct>(
      `https://cx61n7blje.execute-api.us-east-1.amazonaws.com/dev/products/${productId}`
    );
  }

  create(data: Omit<IProduct, 'id'>): Observable<IProduct> {
    return this.http.post<IProduct>(
      'https://cx61n7blje.execute-api.us-east-1.amazonaws.com/dev/products',
      data
    );
  }

  update(data: Omit<IProduct, 'id'>): Observable<void> {
    const { _id, ...rest } = data;
    return this.http.patch<void>(
      `https://cx61n7blje.execute-api.us-east-1.amazonaws.com/dev/products/${_id}`,
      rest
    );
  }

  deleteProduct(productId: string): Observable<void> {
    return this.http.delete<void>(
      `https://cx61n7blje.execute-api.us-east-1.amazonaws.com/dev/products/${productId}`
    );
  }

  changeStockProduct(productId: string): Observable<void> {
    return this.http.post<void>(
      `https://cx61n7blje.execute-api.us-east-1.amazonaws.com/dev/products/change-stock/${productId}`,
      {}
    );
  }

  StatisticsProduct(): Observable<Statistic> {
    return this.http.get<Statistic>(
      'https://cx61n7blje.execute-api.us-east-1.amazonaws.com/dev/products/statistics/all'
    );
  }
}
