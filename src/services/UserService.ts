import { JpaRepository } from './JpaRepository';
import User from '../models/User';
import sequelize from '../config/db.connection';
import PasswordService from './PasswordService';

export class UserService implements JpaRepository<User> {
    private passwordService: PasswordService;

    constructor() {
        sequelize.addModels([User]);
        this.passwordService = new PasswordService();
    }

    async create(user: User): Promise<User | null> {
        try {
            user.password = await this.passwordService.hashPassword(user.password);
            const createdUser = await User.create(user.dataValues);
            return createdUser;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    // @ts-ignore
    async deleteById(id: number): Promise<boolean> {
        try {
            const isDeleted = await User.destroy({ where: { id } });
            return isDeleted === 1;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    async findAll(): Promise<User[]> {
        const users: User[] = await User.findAll();
        return users;
    }

    async findById(id: number): Promise<User | null> {
        const user: User | null = await User.findOne({ where: { id } });
        return user;
    }

    // @ts-ignore
    async update(user: User): Promise<User | null> {
        try {
            const { id, password } = user;

            // Hash the password if it exists
            if (password) {
                user.password = await this.passwordService.hashPassword(password);
            }

            delete user.id; // Remove the ID from the user object to prevent updating it

            await User.update(user.dataValues, { where: { id } });

            const updatedUser = await User.findByPk(id);
            return updatedUser;
        } catch (e) {
            console.error(e);
            return null;
        }
    }


}
