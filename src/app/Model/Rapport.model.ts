import { CourierModel } from "./Courier.model";
import { UserModel } from "./User.model";

export interface RapportModel{
    id: number;
    date: string;
    courier: CourierModel;
    coordonateur: UserModel;
}