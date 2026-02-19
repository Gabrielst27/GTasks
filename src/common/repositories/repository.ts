import { BadRequestException } from '@nestjs/common';

export abstract class BaseRepository {
  protected abstract searchableFields: string[];
  protected abstract sortableFields: string[];

  private validateSearchableFields(fields: string[]) {
    fields.map((field) => {
      if (!this.searchableFields.includes(field)) {
        throw new BadRequestException('Consulta inválida');
      }
    });
  }

  private validateSortableField(field: string) {
    if (!this.sortableFields.includes(field)) {
      throw new BadRequestException('Consulta inválida');
    }
  }

  protected validateQuery(searchFields: string[], sortField: string) {
    this.validateSearchableFields(searchFields);
    this.validateSortableField(sortField);
  }
}
