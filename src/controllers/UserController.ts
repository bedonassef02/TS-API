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

    update(request: Request, response: Response): void {
        // Implement the update logic
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
