import { IRepository } from 'src/common/repositories/repository.interface';

export namespace PagedResponse {
  export type Props<Item> = {
    items: Item[];
    total: number;
    currentPage: number;
    lastPage: number;
    perPage: number;
  };

  export class Mapper {
    static toResponse<Item>(
      items: Item[],
      result: IRepository.SearchResult<Item>,
    ): Props<Item> {
      return {
        items,
        total: result.total,
        currentPage: result.page,
        lastPage: result.lastPage,
        perPage: result.perPage,
      };
    }
  }
}
