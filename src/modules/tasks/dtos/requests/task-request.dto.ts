import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { TaskPriority } from 'src/modules/tasks/enums/priority';
import { TaskStatus } from 'src/modules/tasks/enums/status';

export class TaskRequestDto {
  @IsNotEmpty({ message: 'title não pode estar vazio' })
  @IsString({ message: 'title deve ser uma string' })
  @ApiProperty({ description: 'Título da tarefa' })
  title: string;

  @IsOptional({ message: 'description não pode estar vazio' })
  @IsString({ message: 'description deve ser uma string' })
  @ApiProperty({ description: 'Descrição da tarefa', required: false })
  description?: string;

  @IsOptional({ message: 'status não pode estar vazio' })
  @IsEnum(TaskStatus, {
    message:
      'status deve ser um enum com os seguintes valores: to_do, in_progress, done',
  })
  @ApiProperty({ description: 'Status da tarefa', required: false })
  status?: TaskStatus;

  @IsOptional({ message: 'priority não pode estar vazio' })
  @IsEnum(TaskPriority, {
    message:
      'priority deve ser um enum com os seguintes valores: low, medium, high',
  })
  @ApiProperty({ description: 'Prioridade da tarefa', required: false })
  priority?: TaskPriority;

  @IsOptional({ message: 'dueDate não pode estar vazio' })
  @IsDate({ message: 'dueDate deve ser uma data' })
  @ApiProperty({ description: 'Data de vencimento da tarefa', required: false })
  dueDate?: Date;

  @IsNotEmpty({ message: 'projectId precisa estar preenchido' })
  @IsUUID('4', { message: 'projectId deve ser um UUID' })
  @ApiProperty({ description: 'Projeto ao qual a tarefa pertence' })
  projectId: string;
}
