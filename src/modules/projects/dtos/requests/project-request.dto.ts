import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

export class ProjectRequestDto {
  @IsNotEmpty({ message: 'name não pode estar vazio' })
  @IsString({ message: 'name deve ser uma string' })
  @ApiProperty({ description: 'Nome do projeto' })
  name: string;

  @IsNotEmpty({ message: 'description não pode estar vazio' })
  @IsString({ message: 'description deve ser uma string' })
  @ApiProperty({ description: 'Descrição do projeto', required: false })
  description: string;
}
