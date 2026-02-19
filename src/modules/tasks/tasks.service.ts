import { Injectable } from '@nestjs/common';
import { SearchManyRequestDto } from 'src/common/dtos/requests/search-many-request.dto';
import { SearchResult } from 'src/common/repositories/search-result';
import { CreateTaskRequestDto } from 'src/modules/tasks/dtos/requests/create-task-request.dto';
import { TaskRequestDto } from 'src/modules/tasks/dtos/requests/task-request.dto';
import { TaskResponse } from 'src/modules/tasks/dtos/responses/task-response.dto';
import { ITaskRepository } from 'src/modules/tasks/repositories/task-repository';
import { CreateTaskUseCase } from 'src/modules/tasks/usecases/create.usecase';
import { FindAllTasksByProjectUseCase } from 'src/modules/tasks/usecases/find-all-by-project.usecase';
import { FindAllTasksUseCase } from 'src/modules/tasks/usecases/find-all.usecase';
import { FindTaskByIdUseCase } from 'src/modules/tasks/usecases/find-by-id.usecase';
import { UpdateTaskUseCase } from 'src/modules/tasks/usecases/update.usecase';

@Injectable()
export class TasksService {
  constructor(private repository: ITaskRepository) {}

  async findById(id: string): Promise<TaskResponse.Dto> {
    const usecase = new FindTaskByIdUseCase.UseCase(this.repository);
    return await usecase.execute({ id });
  }

  async findAll(
    params: SearchManyRequestDto,
  ): Promise<SearchResult<TaskResponse.Dto>> {
    const usecase = new FindAllTasksUseCase.UseCase(this.repository);
    return await usecase.execute(params);
  }

  async findAllByProject(
    projectId: string,
    params: SearchManyRequestDto,
  ): Promise<SearchResult<TaskResponse.Dto>> {
    const usecase = new FindAllTasksByProjectUseCase.UseCase(this.repository);
    return await usecase.execute({ projectId, params });
  }

  async create(request: CreateTaskRequestDto): Promise<TaskResponse.Dto> {
    const usecase = new CreateTaskUseCase.UseCase(this.repository);
    return await usecase.execute(request);
  }

  async update(id: string, request: TaskRequestDto): Promise<TaskResponse.Dto> {
    const usecase = new UpdateTaskUseCase.UseCase(this.repository);
    return await usecase.execute({ id, ...request });
  }
}
