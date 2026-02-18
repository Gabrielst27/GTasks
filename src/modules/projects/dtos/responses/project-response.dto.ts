import { ApiProperty } from '@nestjs/swagger';
import { ProjectEntity } from 'src/modules/projects/entities/project.entity';

export namespace ProjectResponse {
  type Props = {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };

  export class Dto implements Props {
    @ApiProperty({ description: 'ID do projeto' })
    id: string;

    @ApiProperty({ description: 'Nome do projeto' })
    name: string;

    @ApiProperty({ description: 'Descrição do projeto' })
    description: string;

    @ApiProperty({ format: 'date-time' })
    createdAt: string;

    @ApiProperty({ format: 'date-time' })
    updatedAt: string;

    constructor(props: Dto) {
      Object.assign(this, {
        ...props,
      });
    }
  }

  export class Mapper {
    static toResponse(entity: ProjectEntity): Dto {
      const json = entity.toJson();
      const response = new Dto({
        ...json,
        createdAt: json.createdAt.toISOString(),
        updatedAt: json.updatedAt.toISOString(),
      });
      return response;
    }
  }
}
