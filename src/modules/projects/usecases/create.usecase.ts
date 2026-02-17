import { BadRequestException } from '@nestjs/common';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import {
  ProjectResponseDto,
  ProjectResponseMapper,
} from 'src/modules/projects/dtos/responses/project-response.dto';
import { ProjectEntity } from 'src/modules/projects/entities/project.entity';
import { IProjectRepository } from 'src/modules/projects/repositories/projects.repository';

export type Input = {
  name: string;
  description?: string;
};

export type Output = ProjectResponseDto;

export class CreateProjectUseCase implements IUseCase<Input, Output> {
  constructor(private repository: IProjectRepository) {}

  async execute(input: Input): Promise<ProjectResponseDto> {
    const { name, description } = input;
    if (!name) {
      throw new BadRequestException('Dados inválidos');
    }
    const entity = new ProjectEntity({ name, description });
    const result = await this.repository.create(entity);
    return ProjectResponseMapper.toResponse(result);
  }
}
