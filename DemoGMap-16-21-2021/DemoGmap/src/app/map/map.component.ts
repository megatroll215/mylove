import {Component, OnInit} from '@angular/core';
import {default as data} from 'data.json';
import {TranslateService} from "@ngx-translate/core";

import GeocoderStatus = google.maps.GeocoderStatus;
import {delay} from "rxjs";
import {HttpClient} from "@angular/common/http";


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


  tempContent: any
  poly: any[] = [];
  info: any
  locationDetail: string | any = ""
  map: any

  node: any
  Hanoi: any = {
    lat: 21.028033,
    lng: 105.851242,
  };

//test


//end: test
//get GeoCoder
  GetGeoCoder(location: google.maps.LatLng) {

    let geocoder = new google.maps.Geocoder();

    /* geocoder.geocode({location: location}).then((response)=>{
     // @ts-ignore
       if(response.results[0] )
     {
       detail =  response.results[0].formatted_address.toString()
       console.log("1 : " + response.results[0].formatted_address.toString())
       return detail

     }else return detail}

    )*/

    geocoder.geocode({'location': location}, (results, status) => {
      if (status == 'OK') {
        if (results) {

          this.locationDetail += results[0].formatted_address.toString()
          console.log(this.locationDetail)



        }

      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }


    })

  }


  //end get geocoder
//get location detail

//end: get location detail
  constructor(public translate: TranslateService) {
    translate.addLangs(['vie', 'en'])
    translate.setDefaultLang('en');
  }

  async TranslateTool(input: string) {

    await this.translate.get('a').toPromise().then();
    return this.translate.instant(input)


  }


  async TranslateTo(lang: string) {
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


  async ngOnInit() {
    this.GetGeoCoder(this.Hanoi)

    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      zoom: 14,
      center: this.Hanoi,

    });
    ;


//test geodcode: begin


//test geocode: end
    for (let i = 0; i < 5; i++) {


      // @ts-ignore
      if (data.zone[i].population != null && data.zone[i].population >= 100) {
        const center = data.zone[i].center as unknown as google.maps.LatLng;



        let pop = data.zone[i].population
        if (pop !== null) {
          pop = Math.round(pop);
        }


        let hexagons = data.zone[i].hexagon;


        const zone_area = new google.maps.Polygon({
          paths: hexagons,
          strokeColor: "rgba(255,153,0,0.73)",
          strokeOpacity: 0.5,
          strokeWeight: 0.5,
          fillColor: this.ColorIntensive(data.zone[i].population, data.zone[i].layer),
          fillOpacity: 0.5,
          visible: false,

        });




        console.log(this.locationDetail)
        this.tempContent = "<b>" + await this.TranslateTool("ZONE-INFO.layer") + "</b>" + " : " + "<span>" + data.zone[i].layer + "</span>" + "</br>" +
          "<b>" + await this.TranslateTool("ZONE-INFO.BIN-COUNT") + "</b>" + " : " + "<span>" + data.zone[i].binCount + "</span>" + "</br>" +
          "<b>" + await this.TranslateTool("ZONE-INFO.MTD-COUNT") + "</b>" + " : " + "<span>" + data.zone[i].mtdCount + "</span>" + "</br>" +
          "<b>" + await this.TranslateTool("ZONE-INFO.POPULATION") + "</b>" + " : " + "<span>" + pop + "</span></br>"


        const info = new google.maps.InfoWindow({
          content:
          this.tempContent,
          position: center

        })

        google.maps.event.addDomListener(document.getElementById("selectLang") as HTMLElement, "change", async () => {
          info.setContent("<b>" + await this.TranslateTool("ZONE-INFO.layer") + "</b>" + " : " + "<span>" + data.zone[i].layer + "</span>" + "</br>" +
            "<b>" + await this.TranslateTool("ZONE-INFO.BIN-COUNT") + "</b>" + " : " + "<span>" + data.zone[i].binCount + "</span>" + "</br>" +
            "<b>" + await this.TranslateTool("ZONE-INFO.MTD-COUNT") + "</b>" + " : " + "<span>" + data.zone[i].mtdCount + "</span>" + "</br>" +
            "<b>" + await this.TranslateTool("ZONE-INFO.POPULATION") + "</b>" + " : " + "<span>" + pop + "</span></br>" )

        })


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
      //set detail to ""

      //
    }


  }

}



