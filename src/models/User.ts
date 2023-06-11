import {Model, Table, Column, DataType} from 'sequelize-typescript';

@Table({tableName: 'users', timestamps: true})
class User extends Model<User> {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    email: string;
    @Column({type: DataType.STRING, allowNull: false})
    password: string;
}

export default User;
