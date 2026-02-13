import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectRequestDto } from 'src/modules/projects/dtos/projects.dto';
import { ProjectsService } from 'src/modules/projects/projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findById(id);
  }

  @Post()
  create(@Body() data: ProjectRequestDto) {
    return this.projectsService.create(data);
  }

  @Put()
  update(@Param('id') id: string, @Body() data: ProjectRequestDto) {
    return this.projectsService.update(id, data);
  }

  @Delete()
  delete(@Param('id') id: string) {
    return this.projectsService.delete(id);
  }
}
