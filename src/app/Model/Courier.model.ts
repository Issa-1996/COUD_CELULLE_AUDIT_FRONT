import { FicheDeControlModel } from "./FicheDeControl.model";
import { RapportModel } from "./Rapport.model";
import { UserModel } from "./User.model";

export interface CourierModel{
    id: string;
    numeroCourier: string;
    object:string;
    nature: string;
    etat:string;
    numeroArriver:string;
    numeroDepart:string;
    dateArriver: string;
    expediteur: string;
    typeDeCourrier:string;
    dateDepart:string;
    destination:string;
    observation:string;
    statut:string;
    rapport: RapportModel;
    controleurs: UserModel;
    assistante: UserModel;
    coordinateur: UserModel;
    ficheDeControle: FicheDeControlModel;
}