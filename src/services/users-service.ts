import { User } from "../models/user-model";
import { IUser } from "../shared/interfaces";

export class UsersService {
    static findAll = () => {
        return User.findAll({ order: [['rank', 'ASC']] });
    }

    static create = (user: IUser) => {
        let newUser = User.build({ name: user.name, rank: user.rank });
        return newUser.save();
    }

    static updateUser = (updatedUser: IUser, id: number) => {
        return User.update(updatedUser, { where: { id: id } });
    }

    static deleteById = (id: number) => {
        return User.destroy({ where: { id: id } });
    }
}
