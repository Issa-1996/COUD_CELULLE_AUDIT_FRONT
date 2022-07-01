import { CourierModel } from "./Courier.model";

export interface Facture{
    id: number;
    numeroFacture: string;
    montant:string;
    object:string;
    beneficaire:string;
    courierDepart: CourierModel;
    courierArriver: CourierModel;
}