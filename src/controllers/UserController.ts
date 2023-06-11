import {Request, Response} from 'express';
import {ICRUD} from './ICRUD';
import User from '../models/User';
import {UserService} from '../services/UserService';

class UserController implements ICRUD {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async index(request: Request, response: Response): Promise<void> {
        const users = await this.userService.findAll();
        response.json(users);
    }

    async create(request: Request, response: Response): Promise<void> {
        let user: User = this.getUser(request);
        user = await this.userService.create(user);
        if (user) {
            response.status(201).json(user);
        } else {
            response.status(409).json({msg: "Can't Create Account"});
        }
    }

    async delete(request: Request, response: Response): Promise<void> {
        const {id} = request.params;
        const success = await this.userService.deleteById(Number(id));
        if (success) {
            response.status(204).end();
        } else {
            response.status(404).json({msg: "Can't Delete Account"});
        }
    }

    async show(request: Request, response: Response): Promise<void> {
        const {id} = request.params;
        const user: User = await this.userService.findById(Number(id));
        if (user) {
            response.status(200).json(user);
        } else {
            response.status(404).json({msg: "Can't Find Account"});
        }
    }

    async update(request: Request, response: Response): Promise<void> {
        try {
            const {id} = request.params;
            const user: User = await this.userService.findById(Number(id));

            if (!user) {
                response.status(404).json({msg: "User not found"});
                return;
            }
            // Update the user with the new data
            const updatedUser: User = this.getUser(request);
            updatedUser.id = user.id; // Ensure the ID is preserved

            const result: User | null = await this.userService.update(updatedUser);

            if (!result) {
                response.status(500).json({msg: "Failed to update user"});
                return;
            }

            response.status(200).json(result);
        } catch (e) {
            console.error(e);
            response.status(500).json({msg: "Failed to update user"});
        }
    }


    private getUser(request: Request): User {
        const {name, email, password} = request.body;
        const user = new User();
        user.name = name;
        user.email = email;
        user.password = password;
        return user;
    }
}

export default UserController;
