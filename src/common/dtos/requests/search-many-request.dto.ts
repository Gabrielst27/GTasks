import { Type } from 'class-transformer';
import { IsAlpha, IsIn, IsInt, IsOptional } from 'class-validator';
import { IRepository } from 'src/common/repositories/repository.interface';

export class SearchManyRequestDto implements IRepository.SearchProps {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'page deve ser um número inteiro' })
  page?: number | undefined;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'perPage deve ser um número inteiro' })
  perPage?: number | undefined;

  @IsOptional()
  @IsAlpha()
  sort?: string | undefined;

  @IsOptional()
  @IsIn(['asc', 'desc'], { message: 'sortDir deve ser "asc" ou "desc"' })
  sortDir?: 'asc' | 'desc' | undefined;
}
