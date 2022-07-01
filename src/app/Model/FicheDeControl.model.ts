import { CourierModel } from "./Courier.model";
import { UserModel } from "./User.model";

export interface FicheDeControlModel{
    id: number;
    nomControleur:string;
    avisControleur: string;
    motivation:string;
    objet:string;
    recommandations:string;
    controleurs:UserModel;
    coordinateur: UserModel;
    courier:CourierModel;
}