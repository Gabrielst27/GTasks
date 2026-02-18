import { Controller } from '@nestjs/common';

@Controller({
  version: '1',
  path: 'tasks',
})
export class TasksController {}
