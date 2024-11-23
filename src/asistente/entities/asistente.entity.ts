
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('asistentes')
export class Asistente {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    nombre: string

    @Column('text')
    apellido: string

    @Column('bigint', { nullable: true })
    telefono?: number

    @Column({
        type: 'enum',
        enum: ['Grupo1', 'Grupo2', 'Grupo3', 'Grupo4', 'Estudiante', 'Invitado'],
        nullable: false,
        default: 'Grupo1',
    })
    grupo: string;


}
// 