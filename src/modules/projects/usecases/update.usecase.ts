import { BadRequestException } from '@nestjs/common';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { ProjectResponseDto } from 'src/modules/projects/dtos/responses/project-response.dto';
import { IProjectRepository } from 'src/modules/projects/repositories/projects.repository';

export namespace UpdateProjectUseCase {
  export type Input = {
    id: string;
    name: string;
    description?: string;
  };

  export type Output = ProjectResponseDto.Response;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(private repository: IProjectRepository) {}

    async execute(input: Input): Promise<ProjectResponseDto.Response> {
      const { id, name, description } = input;
      if (!id) {
        throw new BadRequestException('Impossível buscar o dado');
      }
      if (!name && !description) {
        throw new BadRequestException('Requisição inválida');
      }
      const project = await this.repository.findById(id);
      const entity = project.updateProps({ name, description });
      const result = this.repository.update(id, entity);
      return ProjectResponseDto.Mapper.toResponse(entity);
    }
  }
}
