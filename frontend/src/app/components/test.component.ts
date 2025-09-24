import { Component, EventEmitter, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { debounceTime} from "rxjs";

@Component({
  selector: "autocomplete-input",
  template: `
    <div class="wrapper">
      <div [class]="'control ' + loading ? 'is-loading' : ''">
        <input type="text" class="input" (keypress)="requestList(value)" />
      </div>
      <div *ngIf="!loading || itemList.length > 0" class="list is-hoverable">
        <a class="list-item" *ngFor="let item of itemsList"></a>
      </div>
    </div>
  `,
})
export class AutocompleteComponent {
  @Output() public onSelect = new EventEmitter();
  public itemsList: any[] = []
  public search= ''; 
  public loading = false;
  private lastRequest: number = 0
  private timeout: any = null

  constructor(private http: HttpClient) {
    
  }

  private getList(query: string){
    return this.http.get<any[]>(`https://example.com/api/items?q=${query}`)
  }

  public requestList(value: string){
    console.error(value)
    if(value != this.search){
        /*this.getList(value).pipe(
            debounceTime(500)
        ).subscribe(
            data => {
                this.loading = false
                this.itemsList = data
            } Es mejor usar FormControl
        )*/ 
        if(this.lastRequest == 0 || this.lastRequest > Date.now() - 500){
            this.getList(value).subscribe(
                data => {
                    this.loading = false
                    this.itemsList = data
                    this.lastRequest = Date.now()
            })
        } else {
            if(this.timeout){
                clearTimeout(this.timeout)
            }
            this.timeout = setTimeout(() => {
                this.getList(value).subscribe(
                    data => {
                        this.loading = false
                        this.itemsList = data
                })
            }, 500)
        }

    }
  }

  ngOnInit() {

  }
}
