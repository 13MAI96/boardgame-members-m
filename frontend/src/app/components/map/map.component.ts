import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { GameService } from '../../services/game/game.service';
import { Column, Map, Place } from '../../models/game';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-map',
    standalone: true,
    imports: [NgIf, MatIconModule],
    templateUrl: './map.component.html',
    styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {

  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;
  private columns: number = 7
  public game_map: Map = new Map()

  constructor(
    private elRef: ElementRef,
    private gameService: GameService
  ){
    this.gameService.getMap();
    this.gameService.game_map.subscribe((map: Map) => {
      this.game_map = map
      this.columns = map.columns?.length
    })
  }


  ngAfterViewInit(): void {
    this.updateContainerWidth();
  }


  @HostListener('window:resize', [])
  onWindowResize() {
    this.updateContainerWidth();
  }

  private updateContainerWidth(): void {
    const containerWidth = this.container.nativeElement.offsetWidth;
    const containerHeight = this.container.nativeElement.offsetHeight;

    const newHex = Math.round((containerWidth/this.columns));

    const hexForHeight = Math.round((containerHeight/this.columns))

    if(newHex*1.7 > hexForHeight){
      this.elRef.nativeElement.style.setProperty('--hex-width', `${hexForHeight}px`);
    } else {
      this.elRef.nativeElement.style.setProperty('--hex-width', `${newHex > 40 ? newHex : 45}px`);
    }

  }

  public getOddClass(column: Column){
    const middle = this.columns/2;
    let odd_n = column.position < middle ? Math.round(middle-column.position) : Math.floor(column.position-middle)
    return `odd-${odd_n}`
  }

  public getHexClass(place: Place){
    return `hex ${place.color}`
  }

  public getHexText(place: Place){
    if(place.visited){
      return place.navigator
    }
    return place.action
  }

  public getReverse(places: Place[]){
    return places.sort((a: Place, b: Place) => b.row - a.row)
  }

}
