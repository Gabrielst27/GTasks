export type SearchProps = {
  page?: number;
  perPage?: number;
  sort?: string;
  sortDir?: 'asc' | 'desc';
};

export class SearchParams {
  readonly page: number;
  readonly perPage: number;
  readonly sort: string;
  readonly sortDir: 'asc' | 'desc';

  constructor(props: SearchProps) {
    //TODO: Create search params validation
    this.page = props.page && props.page >= 0 ? props.page : 0;
    this.perPage = props.perPage && props.perPage >= 1 ? props.perPage : 15;
    this.sort = props.sort || 'createdAt';
    this.sortDir = props.sortDir || 'desc';
  }
}
