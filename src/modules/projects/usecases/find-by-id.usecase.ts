import { BadRequestException } from '@nestjs/common';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { ProjectResponseDto } from 'src/modules/projects/dtos/responses/project-response.dto';
import { IProjectRepository } from 'src/modules/projects/repositories/projects.repository';

export namespace FindProjectByIdUseCase {
  export type Input = {
    id: string;
  };

  export type Output = ProjectResponseDto.Response;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(private repository: IProjectRepository) {}

    async execute(input: Input): Promise<ProjectResponseDto.Response> {
      if (!input.id) {
        throw new BadRequestException('Requisição inválida');
      }
      const result = await this.repository.findById(input.id);
      return ProjectResponseDto.Mapper.toResponse(result);
    }
  }
}
