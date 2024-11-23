import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, Matches } from "class-validator"

export class CreateAsistenteDto {

    @IsString()
    @IsNotEmpty()
    nombre: string

    @IsString()
    @IsNotEmpty()
    apellido: string


    @IsOptional()
    @Matches(/^\d{9}$/, { message: 'El teléfono debe tener exactamente 9 dígitos' })
    telefono: number

    @IsNotEmpty()
    @IsEnum(['Grupo1', 'Grupo2', 'Grupo3', 'Grupo4', 'Estudiante', 'Invitado'])
    grupo: 'Grupo1' | 'Grupo2' | 'Grupo3' | 'Grupo4' | 'Estudiante' | 'Invitado';
}
