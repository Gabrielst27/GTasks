import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ProjectRequestDto } from 'src/modules/projects/dtos/requests/project-request.dto';
import { ProjectResponseDto } from 'src/modules/projects/dtos/response/project-response.dto';
import { ProjectsService } from 'src/modules/projects/projects.service';

@Controller({
  version: '1',
  path: 'projects',
})
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  @ApiResponse({
    type: [ProjectResponseDto],
  })
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    type: ProjectResponseDto,
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.findById(id);
  }

  @Post()
  @ApiResponse({
    type: ProjectResponseDto,
  })
  create(@Body() data: ProjectRequestDto) {
    return this.projectsService.create(data);
  }

  @Put()
  @ApiResponse({
    type: ProjectResponseDto,
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: ProjectRequestDto,
  ) {
    return this.projectsService.update(id, data);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.delete(id);
  }
}
