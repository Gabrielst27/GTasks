import { ApiProperty } from '@nestjs/swagger';

export class ProjectResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ description: 'Nome do projeto' })
  name: string;

  @ApiProperty({ description: 'Descrição do projeto', required: false })
  description: string;

  @ApiProperty({ format: 'date-time' })
  createdAt: string;

  @ApiProperty({ format: 'date-time' })
  updatedAt: string;
}
