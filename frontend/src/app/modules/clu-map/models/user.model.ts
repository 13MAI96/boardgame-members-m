import { LocationModel } from "./location.model"

export class UserModel{
    first_name!: string
    last_name!: string
    location!: LocationModel
    telegram_user!: string
    marker_label!: string

    constructor(first_name: string, last_name: string, location: LocationModel, telegram_user: string){
        this.first_name = first_name
        this.last_name = last_name
        this.location = location
        this.telegram_user = telegram_user
        this.marker_label = first_name[0] + last_name[0]
    }
}


export const usersFake: UserModel[] = [
    new UserModel("Marcelo", "Iglesias", {lng:-6.2648647, lat: 53.3299248}, "13mai96"),
    new UserModel("Ariel", "W", {lng:-6.2891511, lat: 53.3214771}, "arialgo"),
]