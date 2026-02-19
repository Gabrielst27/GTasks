import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { SearchManyRequestDto } from 'src/common/dtos/requests/search-many-request.dto';
import { SearchResult } from 'src/common/repositories/search-result';
import { TaskRequestDto } from 'src/modules/tasks/dtos/requests/task-request.dto';
import { TaskResponse } from 'src/modules/tasks/dtos/responses/task-response.dto';
import { TasksService } from 'src/modules/tasks/tasks.service';

@Controller({
  version: '1',
  path: 'tasks',
})
export class TasksController {
  constructor(private service: TasksService) {}

  @Get(':id')
  @ApiResponse({ type: TaskResponse.Dto })
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Get()
  @ApiResponse({ type: SearchResult<TaskResponse.Dto> })
  findAll(@Query() params: SearchManyRequestDto) {
    return this.service.findAll(params);
  }

  @Get('find-by-project/:id')
  @ApiResponse({ type: SearchResult<TaskResponse.Dto> })
  findAllByProject(
    @Param('id', ParseUUIDPipe) projectId: string,
    @Query() params: SearchManyRequestDto,
  ) {
    return this.service.findAllByProject(projectId, params);
  }

  @Post()
  @ApiResponse({
    type: TaskResponse.Dto,
  })
  create(@Body() data: TaskRequestDto) {
    return this.service.create(data);
  }
}
