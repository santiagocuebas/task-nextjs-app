import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryColumn
} from 'typeorm';
import { IUser } from '../global.js';

@Entity()
export class User extends BaseEntity implements IUser {
	@PrimaryColumn('varchar')
	public id!: string;

	@Column('varchar')
	public firstname!: string;

	@Column('varchar')
	public lastname!: string;

	@Column('varchar', { unique: true })
	public email!: string;

	@Column('varchar')
	public password!: string;

	@CreateDateColumn()
	public createdAt!: Date;
}
