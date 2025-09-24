import { Injectable } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs"
import { Language } from "../../models/language";
import {spanish, english} from "../../utils/languages/index";

const valid_language: Language[] = [
    {
        name: "english",
        sheet: english
    },
    {
        name: "spanish",
        sheet: spanish
    },
]

@Injectable({
  providedIn: 'root',
})
export class LanguageService{
    private _language!: BehaviorSubject<Language>;
    
    
    constructor(){
        this._language = new BehaviorSubject(valid_language[0]);
    }
    
    public get language() : string {
        return this._language.value.name
    }

    public set language(lang: string){
        const new_language = valid_language.find((language) => language.name == lang)
        if(new_language){
            this._language.next(new_language)

        }
    }

    public getTraduction(key: string): string{
        return this._language.value.sheet[key]
    }
    
}