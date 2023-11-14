export interface IProduct {
  _id: string;
  name: string;
  category: string;
  typeStock: string;
  status: string;
  sku: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  createdAt: string;
}

export interface IProductStatic {
  _id: string;
  totalStock: number;
  totalPrice: number;
  totalProduct: number;
}

export enum TypeStatistic {
  IN_STOCK = 'IN_STOCK',
  PUBLISH = 'PUBLISH',
  SCHEDULED = 'SCHEDULED',
  INACTIVE = 'INACTIVE',
}

export type Statistic = Record<TypeStatistic, IProductStatic>;
