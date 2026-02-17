import { ApiProperty } from '@nestjs/swagger';
import { ProjectEntity } from 'src/modules/projects/entities/project.entity';

export type ProjectResponseProps = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

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

  constructor(props: ProjectResponseProps) {
    Object.assign(this, {
      ...props,
    });
  }
}

export class ProjectResponseMapper {
  static toResponse(entity: ProjectEntity): ProjectResponseDto {
    const json = entity.toJson();
    const response = new ProjectResponseDto({
      ...json,
      createdAt: json.createdAt.toISOString(),
      updatedAt: json.updatedAt.toISOString(),
    });
    return response;
  }
}
