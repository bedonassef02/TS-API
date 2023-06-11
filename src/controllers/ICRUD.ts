import {Request, Response} from "express";

export interface ICRUD {
    index(request: Request, response: Response): void

    show(request: Request, response: Response): void

    create(request: Request, response: Response): void

    update(request: Request, response: Response): void

    delete(request: Request, response: Response): void
}
