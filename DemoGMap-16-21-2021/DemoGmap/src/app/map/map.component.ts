import {Component, forwardRef, OnInit} from '@angular/core';
import {Loader} from '@googlemaps/js-api-loader';
import {default as data} from 'data.json';
import {map} from "rxjs";
import {toNumbers} from "@angular/compiler-cli/src/version_helpers";
import {TranslateService} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {equals} from "@ngx-translate/core/lib/util";

export interface Array {
  poly: any[]
}


export interface Area {
  layer: number;
  polygon: google.maps.Polygon;
}

export class Poly implements Area {
  constructor(layer: number, polygon: google.maps.Polygon) {
    this.layer = layer;
    this.polygon = polygon;

  }


  layer: number;
  polygon: google.maps.Polygon;

}


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, Array {

  poly: any[] = [];

  map: any


  Hanoi: any = {
    lat: 21.028033,
    lng: 105.851242,
  };


  displayInfo(info: google.maps.InfoWindow): void {
    info.open();
  }

  constructor(public translate: TranslateService) {
    // translate.addLangs(['vie', 'en'])
    // translate.setDefaultLang('vie');
  }

  TranslateTo(lang: string) {
    this.translate.use(lang)
  }

  ColorIntensive(population: any, layer: number): string {
    switch (layer) {
      case 1:
        if
        (population == null || population < 0)
          return "  #ffcccc\n";
        else if (population > 500 && layer == 1) return "   #b30000\n";
        else if (population > 400 && population <= 500) return "  #e60000";
        else if (population > 300 && population <= 400) return "   #ff0000";
        else if (population > 200 && population <= 300) return "  #ff3333";
        else return "   #ff6666\n";
        break;

      case 2:
        if
        (population == null || population < 0)
          return "  #ffcccc\n";
        else if (population > 500) return "    #b3b300\n";
        else if (population > 400 && population <= 500) return "      \t #e6e600";
        else if (population > 300 && population <= 400) return "     #e6e600\n";
        else if (population > 200 && population <= 300) return "       #ffff00\n";
        else return "      #ffff80\n";
        break;

      case 3:
        if
        (population == null || population < 0)
          return "  #ffcccc\n";
        else if (population > 500) return "     #002699\n";
        else if (population > 400 && population <= 500) return "       #0033cc\n";
        else if (population > 300 && population <= 400) return "     #0040ff\n";
        else if (population > 200 && population <= 300) return "      #3366ff\n";
        else return "       #668cff\n";
        break;
    }
    return "  #ffcccc\n";
  }

  TranslateToLang(lang: string) {
    this.translate.use(lang)
  }


  ngOnInit(): void {


    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      zoom: 14,
      center: this.Hanoi,

    });
    ;
//end zone 3
    // Create a <script> tag and set the USGS URL as the source.


    for (let i = 0; i < data.zone.length; i++) {
      // @ts-ignore
      if (data.zone[i].population >= 100 && data.zone[i].population != null) {
        const center = data.zone[i].center;
        const location = new google.maps.LatLng(center.lat, center.lng);


        let pop = data.zone[i].population
        if (pop !== null) {
          pop = Math.round(pop);
        }
        console.log('AAAA'+ this.translate.instant('a') );
        const info = new google.maps.InfoWindow({
          content:
            "<b > " + this.translate.instant('a') + ": " + data.zone[i].layer + "</b>"
            + "<b>   - " + data.zone[i].binCount + "</b>"
            + "<b>   - " + data.zone[i].mtdCount + "</b>"
            + "<b>   - " + pop + "</b>",


          position: center
        })


        let hexagons = data.zone[i].hexagon;
        let zone_data: google.maps.LatLng[] | undefined;


        const zone_area = new google.maps.Polygon({
          paths: hexagons,
          strokeColor: "rgba(255,153,0,0.73)",
          strokeOpacity: 0.5,
          strokeWeight: 0.5,
          fillColor: this.ColorIntensive(data.zone[i].population, data.zone[i].layer),
          fillOpacity: 0.5,
          visible: false,


        });


        google.maps.event.addListener(zone_area, "click", () => {
          info.open(this.map);
        });

        zone_area.setMap(this.map);
        this.poly.push(new Poly(data.zone[i].layer, zone_area));


        google.maps.event.addDomListener(document.getElementById("layer1_show") as HTMLElement, "click", () => {
          for (let i = 0; i < this.poly.length; i++) {
            if (this.poly[i].layer == 1) {
              this.poly[i].polygon.visible = true;

              this.poly[i].polygon.setMap(this.map)
            } else {
              this.poly[i].polygon.visible = false;
              this.poly[i].polygon.setMap(this.map)
            }
          }
        })
        google.maps.event.addDomListener(document.getElementById("layer2_show") as HTMLElement, "click", () => {
          for (let i = 0; i < this.poly.length; i++) {
            if (this.poly[i].layer == 2) {
              this.poly[i].polygon.visible = true;

              this.poly[i].polygon.setMap(this.map)
            } else {
              this.poly[i].polygon.visible = false;
              this.poly[i].polygon.setMap(this.map)
            }
          }
        })
        google.maps.event.addDomListener(document.getElementById("layer3_show") as HTMLElement, "click", () => {
          for (let i = 0; i < this.poly.length; i++) {
            if (this.poly[i].layer == 3) {
              this.poly[i].polygon.visible = true;

              this.poly[i].polygon.setMap(this.map)
            } else {
              this.poly[i].polygon.visible = false;
              this.poly[i].polygon.setMap(this.map)
            }
          }
        })

        google.maps.event.addDomListener(document.getElementById("All_layer_show") as HTMLElement, "click", () => {
          for (let i = 0; i < this.poly.length; i++) {
            this.poly[i].polygon.visible = true;

            this.poly[i].polygon.setMap(this.map)
          }

        })
        google.maps.event.addDomListener(document.getElementById("All_layer_hidden") as HTMLElement, "click", () => {
          for (let i = 0; i < this.poly.length; i++) {
            this.poly[i].polygon.visible = false;

            this.poly[i].polygon.setMap(this.map)
          }

        })


      }
    }


  }

}

// Loop through the results array and place a marker for each
// set of coordinates.


