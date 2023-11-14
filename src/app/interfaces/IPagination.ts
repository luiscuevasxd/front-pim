export interface IPaginationMetadata {
  page: number;
  per_page: number;
  count: number;
}

export interface IPagination<T> {
  data: T[];
  meta_data: IPaginationMetadata;
}
