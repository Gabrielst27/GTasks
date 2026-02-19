import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
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
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Post()
  @ApiResponse({
    type: TaskResponse.Dto,
  })
  create(@Body() data: TaskRequestDto) {
    return this.service.create(data);
  }
}
