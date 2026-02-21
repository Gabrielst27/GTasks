import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserRequestDto {
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  @Matches(/^[\p{L}\s]+$/u, {
    message: 'Apenas letras e espaço em branco são permitidos no nome',
  })
  @MinLength(2, { message: 'O nome deve conter pelo menos 2 caracteres' })
  @MaxLength(64, { message: 'O nome pode conter no máximo 64 caracteres' })
  @ApiProperty({ description: 'Nome do usuário' })
  name: string;

  @IsNotEmpty({ message: 'O email não pode estar vazio' })
  @IsEmail({}, { message: 'O email deve estar formatado como email' })
  @ApiProperty({ description: 'Email do usuário' })
  email: string;

  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  @IsString({ message: 'A senha deve ser do tipo string' })
  @MinLength(6, { message: 'A senha deve conter pelo menos 6 caracteres' })
  @MaxLength(64, { message: 'A senha pode conter no máximo 64 caracteres' })
  @ApiProperty({ description: 'Senha do usuário' })
  password: string;

  @IsOptional()
  @IsUrl({}, { message: 'O avatar deve ser uma url' })
  @ApiProperty({
    description: 'Url da imagem de avatar do usuário',
    required: false,
  })
  avatar?: string;
}
