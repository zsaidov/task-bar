export interface IPagination<T> {
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
    pageIndex: number;
    pageSize: number;
    totalCount?: number;
}
