export type Pagination = {
    total: number,
    totalPage: number,
    page: number,
    pageSize: number
}

export type Pageable<T> = {
    data: Array<T>,
    pagination: Pagination,
    keyword?: string,
    tag?:string
}