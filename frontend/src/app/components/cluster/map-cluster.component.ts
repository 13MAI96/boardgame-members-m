import { CircleLayerSpecification, SymbolLayerSpecification } from "mapbox-gl";
import { COLORS } from "../../utils/colors.enum";
import { Component, input, OnInit } from "@angular/core";
import { ClusterPointDirective, GeoJSONSourceComponent, LayerComponent, MapComponent, MarkersForClustersComponent } from "ngx-mapbox-gl";
import { NgStyle } from "@angular/common";

@Component({
  selector: 'showcase-cluster-point',
  templateUrl: 'map-cluster.component.html',
  imports: [NgStyle],
})
export class ClusterPointComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  properties = input.required<any>();

  width!: number;
  radio!: number;
  inside_radio!: number;
  viewbox!: string;
  font!: string;
  segments!: { d: string; fill: string }[];
  textTransform!: string;
  totalString!: string;

  ngOnInit() {
    const offsets = [];
    const counts = [
  this.properties().player,
  this.properties().influencer,
  this.properties().shop,
  this.properties().cafe,
];

    let total = 0;
    for (const count of counts) {
      offsets.push(total);
      total += count;
    }
    const fontSize =
      total >= 1000 ? 22 : total >= 100 ? 20 : total >= 10 ? 18 : 16;
    this.font = `${fontSize}px sans-serif`;
    this.radio = total >= 1000 ? 50 : total >= 100 ? 32 : total >= 10 ? 24 : 18;
    this.inside_radio = Math.round(this.radio * 0.6);
    this.width = this.radio * 2;
    this.viewbox = `0 0 ${this.width} ${this.width}`;
    this.textTransform = `translate(${this.radio}, ${this.radio})`;
    this.segments = [];
    for (let i = 0; i < counts.length; i++) {
      this.segments.push(
        this.donutSegment(
          offsets[i] / total,
          (offsets[i] + counts[i]) / total,
          COLORS[i],
        ),
      );
    }
    this.totalString = total.toLocaleString();
  }

  private donutSegment(start: number, end: number, color: string) {
    if (end - start === 1) {
      end -= 0.00001;
    }
    const a0 = 2 * Math.PI * (start - 0.25);
    const a1 = 2 * Math.PI * (end - 0.25);
    const x0 = Math.cos(a0);
    const y0 = Math.sin(a0);
    const x1 = Math.cos(a1);
    const y1 = Math.sin(a1);
    const largeArc = end - start > 0.5 ? 1 : 0;
    return {
      d: `M ${this.radio + this.inside_radio * x0} ${this.radio + this.inside_radio * y0} L ${
        this.radio + this.radio * x0
      } ${this.radio + this.radio * y0} A ${this.radio} ${this.radio} 0 ${largeArc} 1 ${
        this.radio + this.radio * x1
      } ${this.radio + this.radio * y1} L ${this.radio + this.inside_radio * x1} ${
        this.radio + this.inside_radio * y1
      } A ${this.inside_radio} ${this.inside_radio} 0 ${largeArc} 0 ${this.radio + this.inside_radio * x0} ${
        this.radio + this.inside_radio * y0
      }`,
      fill: color,
    };
  }
}