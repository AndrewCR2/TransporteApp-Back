import { IsNotEmpty, IsEnum } from 'class-validator';

export class FindByGroupDto {
  @IsNotEmpty({ message: 'El parámetro grupo es obligatorio' })
  @IsEnum(['Grupo1', 'Grupo2', 'Grupo3', 'Grupo4', 'Estudiante', 'Invitado'], {
    message: 'El grupo enviado no es válido',
  })
  grupo: string;
}
