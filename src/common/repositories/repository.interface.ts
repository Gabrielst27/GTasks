import { EDbOperators } from 'src/common/enum/db-operators.enum';

export namespace IRepository {
  export type QueryProps = {
    field: string;
    value: string;
    operator: EDbOperators;
  };

  export class Query {
    readonly field: string;
    readonly value: string;
    readonly operator: EDbOperators;
    constructor(props: QueryProps) {
      //TODO: Create query validation
      this.field = props.field;
      this.value = props.value;
      this.operator = props.operator;
    }
  }

  export type SearchProps = {
    queries?: Query[];
    page?: number;
    perPage?: number;
    sort?: string;
    sortDir?: 'asc' | 'desc';
  };

  export class SearchParams {
    readonly queries: Query[];
    readonly page: number;
    readonly perPage: number;
    readonly sort: string;
    readonly sortDir: 'asc' | 'desc';

    constructor(props: SearchProps) {
      //TODO: Create search params validation
      this.queries = props.queries || [];
      this.page = props.page && props.page >= 0 ? props.page : 0;
      this.perPage = props.perPage && props.perPage >= 1 ? props.perPage : 15;
      this.sort = props.sort || 'createdAt';
      this.sortDir = props.sortDir || 'desc';
    }
  }

  type SearchResultProps<Item> = {
    items: Item[];
    total: number;
    page: number;
    perPage: number;
    sort: string;
    sortDir: 'asc' | 'desc';
  };

  export class SearchResult<Item> {
    readonly items: Item[];
    readonly total: number;
    readonly page: number;
    readonly perPage: number;
    readonly lastPage: number;
    readonly sort: string;
    readonly sortDir: 'asc' | 'desc';

    constructor(props: SearchResultProps<Item>) {
      //TODO: Create search result validation
      this.items = props.items;
      this.total = props.total;
      this.page = props.page;
      this.perPage = props.perPage;
      this.sort = props.sort;
      this.sortDir = props.sortDir;
      //TODO: fix lastPage
      this.lastPage = Math.floor(props.total / props.perPage);
    }
  }

  export interface Repository<Item> {
    findById(id: string): Promise<Item>;
    findMany(params: SearchParams): Promise<SearchResult<Item>>;
    create(item: Item): Promise<Item>;
    update(id: string, item: Item): Promise<Item>;
    delete(id: string): Promise<Item>;
  }
}
