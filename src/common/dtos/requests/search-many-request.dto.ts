import { Type } from 'class-transformer';
import {
  IsAlpha,
  IsEnum,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { EDbOperators } from 'src/common/enum/db-operators.enum';
import { IRepository } from 'src/common/repositories/repository.interface';

export namespace SearchManyRequestDto {
  class Query implements IRepository.QueryProps {
    @IsNotEmpty()
    @IsAlpha()
    field: string;

    @IsNotEmpty()
    @IsString()
    value: string;

    @IsNotEmpty()
    @IsEnum(EDbOperators)
    operator: EDbOperators;
  }

  export class QueriesRequest {
    @IsOptional()
    @ValidateNested({ message: 'Query inválida' })
    @Type(() => Query)
    queries?: Query[];
  }

  export class Request implements IRepository.SearchProps {
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
}
