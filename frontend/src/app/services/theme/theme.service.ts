import { Injectable } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs"

@Injectable({
  providedIn: 'root',
})
export class ThemeService{
    private _darkTheme!: BehaviorSubject<boolean>;
    
    constructor(){
        const theme = localStorage.getItem('theme');
        document.documentElement.classList.toggle(
            'dark',
            theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
          )
        if(theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)){
            this._darkTheme = new BehaviorSubject(true);
        } else {
            this._darkTheme = new BehaviorSubject(false)
        }
    }
    
    public get darkTheme() : boolean {
        return this._darkTheme.value
    }

    public set darkTheme(theme: boolean){
        if(theme) {
            document.documentElement.classList.toggle('dark')
            localStorage.setItem('theme', 'dark')
        }
        else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        };
        this._darkTheme.next(theme)
    }

    public subscribable(): BehaviorSubject<boolean>{
        return this._darkTheme
    }
    
}