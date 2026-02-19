import { Injectable } from '@nestjs/common';
import { SearchManyRequestDto } from 'src/common/dtos/requests/search-many-request.dto';
import { TaskRequestDto } from 'src/modules/tasks/dtos/requests/task-request.dto';
import { TaskResponse } from 'src/modules/tasks/dtos/responses/task-response.dto';
import { ITaskRepository } from 'src/modules/tasks/repositories/task-repository';
import { CreateTaskUseCase } from 'src/modules/tasks/usecases/create.usecase';
import { FindTaskByIdUseCase } from 'src/modules/tasks/usecases/find-by-id.usecase';

@Injectable()
export class TasksService {
  constructor(private repository: ITaskRepository) {}

  async findById(id: string): Promise<TaskResponse.Dto> {
    const usecase = new FindTaskByIdUseCase.UseCase(this.repository);
    return await usecase.execute({ id });
  }

  async findAllByProject(projectId: string, params: SearchManyRequestDto) {}

  async create(request: TaskRequestDto): Promise<TaskResponse.Dto> {
    const usecase = new CreateTaskUseCase.UseCase(this.repository);
    return await usecase.execute(request);
  }
}
