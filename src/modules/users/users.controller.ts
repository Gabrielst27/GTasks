import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UserRequestDto } from 'src/modules/users/dtos/requests/user-request.dto';
import { UserResponse } from 'src/modules/users/dtos/responses/user-response.dto';
import { UsersService } from 'src/modules/users/users.service';

@Controller({
  version: '1',
  path: 'users',
})
export class UsersController {
  constructor(private service: UsersService) {}

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    type: UserResponse.Dto,
  })
  create(@Body() data: UserRequestDto) {
    return this.service.create(data);
  }
}
