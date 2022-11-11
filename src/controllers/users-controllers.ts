import { Request, Response } from "express";

import { UsersService } from "../services/users-service";

export class UsersControllers {
    static getUsers = async (req: Request, res: Response) => {
        try {
            const users = await UsersService.findAll();
            res.status(200).json({ users });
        } catch (error) {
            console.log('Error getUsers: ', error);
        }
    }

    static createUser = async (req: Request, res: Response) => {
        const { name, rank }: { name: string, rank: number } = req.body;
        const newUser = {
            name,
            rank
        }
        try {
            const newUserResult = await UsersService.create(newUser);
            res.status(200).json({ newUser: newUserResult });
        } catch (error) {
            console.log('Error createUser: ', error);
        }
    }

    static updateUser = async (req: Request, res: Response) => {
        const { name, rank }: { name: string, rank: number } = req.body;
        const userId = Number(req.params.uid);
        const updatedUser = {
            id: userId,
            name,
            rank
        }
        try {
            await UsersService.updateUser(updatedUser, userId);
            res.status(200).json({ updatedUser });
        } catch (error) {
            console.log('Error updateUser: ', error);
        }
    }

    static deleteUser = async (req: Request, res: Response) => {
        const userId = Number(req.params.uid);
        try {
            const deletedUser = await UsersService.deleteById(userId);
            res.status(200).json({ message: `Deleted user with id = ${userId}` });
        } catch (error) {
            console.log('Error deleteUser: ', error);
        }
    }
}