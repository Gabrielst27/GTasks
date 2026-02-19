import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { TaskRequestDto } from 'src/modules/tasks/dtos/requests/task-request.dto';

export class CreateTaskRequestDto extends TaskRequestDto {
  @IsNotEmpty({ message: 'projectId precisa estar preenchido' })
  @IsUUID('4', { message: 'projectId deve ser um UUID' })
  @ApiProperty({ description: 'Projeto ao qual a tarefa pertence' })
  projectId: string;
}
