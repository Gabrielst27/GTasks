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
import { ProjectRequestDto } from 'src/modules/projects/dtos/requests/project-request.dto';
import { ProjectResponseDto } from 'src/modules/projects/dtos/responses/project-response.dto';
import { ProjectsService } from 'src/modules/projects/projects.service';

@Controller({
  version: '1',
  path: 'projects',
})
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  @ApiResponse({
    type: [ProjectResponseDto.Response],
  })
  findAll(
    @Query() searchParams: SearchManyRequestDto.Request,
    @Body() queries: SearchManyRequestDto.QueriesRequest,
  ) {
    return this.projectsService.findMany(searchParams, queries);
  }

  @Get(':id')
  @ApiResponse({
    type: ProjectResponseDto.Response,
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.findById(id);
  }

  @Post()
  @ApiResponse({
    type: ProjectResponseDto.Response,
  })
  create(@Body() data: ProjectRequestDto) {
    return this.projectsService.create(data);
  }

  @Put(':id')
  @ApiResponse({
    type: ProjectResponseDto.Response,
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
