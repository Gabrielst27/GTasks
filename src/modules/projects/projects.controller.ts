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
  Query,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { SearchManyRequestDto } from 'src/common/dtos/requests/search-many-request.dto';
import { SearchResult } from 'src/common/repositories/search-result';
import { ProjectRequestDto } from 'src/modules/projects/dtos/requests/project-request.dto';
import { ProjectResponse } from 'src/modules/projects/dtos/responses/project-response.dto';
import { ProjectsService } from 'src/modules/projects/projects.service';

@Controller({
  version: '1',
  path: 'projects',
})
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  @ApiResponse({
    type: [SearchResult<ProjectResponse.Dto>],
  })
  findAll(@Query() searchParams: SearchManyRequestDto) {
    return this.projectsService.findAll(searchParams);
  }

  @Get(':id')
  @ApiResponse({
    type: ProjectResponse.Dto,
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.findById(id);
  }

  @Post()
  @ApiResponse({
    type: ProjectResponse.Dto,
  })
  create(@Body() data: ProjectRequestDto) {
    return this.projectsService.create(data);
  }

  @Put(':id')
  @ApiResponse({
    type: ProjectResponse.Dto,
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
