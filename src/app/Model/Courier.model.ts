import { RapportModel } from "./Rapport.model";
import { UserModel } from "./User.model";

export interface CourierModel{
    id: string;
    numeroCourier: string;
    object:string;
    nature: string;
    etat:string;

    dateArriver: string;
    expediteur: string;
    dateCorrespondance:string;
    numeroCorrespondance:string;
    dateReponse:string;
    numeroReponse:string;

    dateDepart:string;
    destination:string;
    nombrePiece:string;
    numeroArchive:string;
    observation:string;
    numeroOrdre:string;
    statut:string;
    
    rapport: RapportModel;
    controleurs: UserModel;
    assistante: UserModel;
    coordinateur: UserModel;
}