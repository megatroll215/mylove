import {Component, OnInit} from '@angular/core';
import {default as data} from 'data.json';
import {TranslateService} from "@ngx-translate/core";

import {LocationService} from '../service/getReverseGeocodingservice'
import {HttpClient} from "@angular/common/http";
import axios from "axios";
import ScaleControlStyle = google.maps.ScaleControlStyle;


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
  infoWindow = new google.maps.InfoWindow
  locationService: LocationService | any
  http: HttpClient | any
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


  /*    let geocoder = new google.maps.Geocoder();*/

  /* geocoder.geocode({location: location}).then((response)=>{
   // @ts-ignore
     if(response.results[0] )
   {
     detail =  response.results[0].formatted_address.toString()
     console.log("1 : " + response.results[0].formatted_address.toString())
     return detail

   }else return detail}

  )*/

  /*geocoder.geocode({'location': location}, (results, status) => {
    if (status == 'OK') {
      if (results) {

        this.locationDetail += results[0].formatted_address.toString()



      }

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }


  }).then(() =>{
    new google.maps.Marker({
      position: location,
      map: this.map,
      title: this.locationDetail,

    })
  })
*/


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

 handleLocationError(this: any, browserHasGeolocation: boolean,
                               infoWindow: google.maps.InfoWindow,
                               pos: google.maps.LatLng) {
    {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(this.map);
    }

  }


  async TranslateTo(lang: string) {
    this.translate.use(lang)


  }



  CreateButton(btnName: string, btnTitle: string, btnTd: string, pos: google.maps.ControlPosition) {
    const centerDiv = document.createElement("div") as HTMLElement
    centerDiv.className = "d-flex justify-content-center"
    const centerButton = document.createElement("button") as HTMLElement;
    centerButton.textContent = btnName
    centerButton.title =
      centerButton.id = "center-button"
    centerButton.style.fontFamily = "Monospace"
    centerButton.style.fontWeight = "bold"
    centerButton.className = "btn btn-light"
    centerDiv.style.marginTop = "10px"
    centerDiv.style.marginBottom = "10px"

    centerDiv.appendChild(centerButton)
    this.map.controls[pos].push(centerDiv)
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
//mapInit
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      zoom: 14,
      center: this.Hanoi,
      zoomControl: true,
      zoomControlOptions:{
        position: google.maps.ControlPosition.RIGHT_BOTTOM
      },
      mapTypeControl: true,
      mapTypeControlOptions: {
        mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain", "dark-mode"],
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        position: google.maps.ControlPosition.LEFT_TOP

      },
      rotateControl: true,
      scaleControlOptions: {

      },


    });
//end
    //Dark-Mode styled
    const darkMode = new google.maps.StyledMapType([
      {elementType: "geometry", stylers: [{color: "#242f3e"}]},
      {elementType: "labels.text.stroke", stylers: [{color: "#242f3e"}]},
      {elementType: "labels.text.fill", stylers: [{color: "#746855"}]},
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{color: "#d59563"}],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{color: "#d59563"}],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{color: "#263c3f"}],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{color: "#6b9a76"}],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{color: "#38414e"}],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{color: "#212a37"}],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{color: "#9ca5b3"}],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{color: "#746855"}],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{color: "#1f2835"}],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{color: "#f3d19c"}],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{color: "#2f3948"}],
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{color: "#d59563"}],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{color: "#17263c"}],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{color: "#515c6d"}],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{color: "#17263c"}],
      },
    ], {name: "Night"})

    this.map.mapTypes.set("dark-mode", darkMode)
    this.map.setMapTypeId("dark-mode")
    //end


//Legend
    const LegendContainer = document.createElement("div") as HTMLElement
    LegendContainer.id = "lecon"
    LegendContainer.style.margin = "auto"
    LegendContainer.style.backgroundColor = "transparent";
    LegendContainer.style.border = "2px solid #fff";
    LegendContainer.style.borderRadius = "3px";
    LegendContainer.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    LegendContainer.style.cursor = "pointer";

    LegendContainer.style.textAlign = "center";
    LegendContainer.title = "Population color";
    LegendContainer.style.marginTop = "10px"
    LegendContainer.style.marginBottom = "10px"
    const LegendHeader = document.createElement("p") as HTMLElement
    LegendHeader.textContent = ""
    LegendHeader.style.fontWeight = "bold"
    LegendHeader.style.backgroundColor = "transparent"
    LegendHeader.style.color = "yellow"
    LegendHeader.style.fontFamily = "Courier"
    LegendContainer.appendChild(LegendHeader);
    const hr = document.createElement("hr") as HTMLElement
    hr.style.backgroundColor = "white"
    LegendContainer.appendChild(hr);


    (document.getElementById("holder") as HTMLElement).append(LegendContainer)

//center-button
    this.CreateButton("Center", "move back to center", "btnCenter", google.maps.ControlPosition.TOP_CENTER)
    //end

//GPS-button
    this.CreateButton("GPS", "your location", "btnGPS", google.maps.ControlPosition.RIGHT_CENTER);
//end
//GPS-button-event
/*    (document.getElementById("btnGPS") as HTMLElement).addEventListener("click", () => {
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            this.infoWindow.setPosition(pos);
            this.infoWindow.setContent("Location found.");
            this.infoWindow.open(this.map);
            this.map.setCenter(pos);
          },
          () => {
            this.handleLocationError(true, this.infoWindow, this.map.getCenter()!);
          }
        );
      } else {
        // Browser doesn't support Geolocation
        this.handleLocationError(false, this.infoWindow, this.map.getCenter()!);
      }
    });*/




//end

    //For: hexagons
    for (let i = 0; i < data.zone.length; i++) {


      if (data.zone[i].population !== null && <number>data.zone[i].population >= 100) {
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

        let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + center.lat.toString() + "," + center.lng.toString() + "&key=AIzaSyA2zmfFiqBqvwBMOqEGlEzWqmSRAPaX3kM"

        let res = await axios.get(url)
        this.locationDetail = res.data.results[0].formatted_address


        this.tempContent = "<b>" + await this.TranslateTool("ZONE-INFO.layer") + "</b>" + " : " + "<span>" + data.zone[i].layer + "</span>" + "</br>" +
          "<b>" + await this.TranslateTool("ZONE-INFO.BIN-COUNT") + "</b>" + " : " + "<span>" + data.zone[i].binCount + "</span>" + "</br>" +
          "<b>" + await this.TranslateTool("ZONE-INFO.MTD-COUNT") + "</b>" + " : " + "<span>" + data.zone[i].mtdCount + "</span>" + "</br>" +
          "<b>" + await this.TranslateTool("ZONE-INFO.POPULATION") + "</b>" + " : " + "<span>" + pop + "</span></br>" + this.locationDetail


        const info = new google.maps.InfoWindow({
          content:
          this.tempContent,
          position: center

        })

        google.maps.event.addListener(zone_area, "click", async () => {
          info.open(this.map);

        });

        google.maps.event.addDomListener(document.getElementById("selectLang") as HTMLElement, "change", async () => {
          info.setContent("<b>" + await this.TranslateTool("ZONE-INFO.layer") + "</b>" + " : " + "<span>" + data.zone[i].layer + "</span>" + "</br>" +
            "<b>" + await this.TranslateTool("ZONE-INFO.BIN-COUNT") + "</b>" + " : " + "<span>" + data.zone[i].binCount + "</span>" + "</br>" +
            "<b>" + await this.TranslateTool("ZONE-INFO.MTD-COUNT") + "</b>" + " : " + "<span>" + data.zone[i].mtdCount + "</span>" + "</br>" +
            "<b>" + await this.TranslateTool("ZONE-INFO.POPULATION") + "</b>" + " : " + "<span>" + pop + "</span></br>" + this.locationDetail)

        })


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
          ;
          this.map.setCenter({lat: 21.029014, lng: 105.851083} as unknown as google.maps.LatLng)
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
          ;
          this.map.setCenter({lat: 21.029014, lng: 105.851083} as unknown as google.maps.LatLng)
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
          ;
          this.map.setCenter({lat: 21.029014, lng: 105.851083} as unknown as google.maps.LatLng)
        })

        google.maps.event.addDomListener(document.getElementById("All_layer_show") as HTMLElement, "click", () => {
          for (let i = 0; i < this.poly.length; i++) {
            this.poly[i].polygon.visible = true;

            this.poly[i].polygon.setMap(this.map)
          }
          ;
          this.map.setCenter({lat: 21.029014, lng: 105.851083} as unknown as google.maps.LatLng)

        })
        google.maps.event.addDomListener(document.getElementById("All_layer_hidden") as HTMLElement, "click", () => {
          for (let i = 0; i < this.poly.length; i++) {
            this.poly[i].polygon.visible = false;

            this.poly[i].polygon.setMap(this.map)
          }
          ;
          this.map.setCenter({lat: 21.029014, lng: 105.851083} as unknown as google.maps.LatLng)

        })


      }
      //set detail to ""
      this.locationDetail = ""

      //

    }
    //create Center-button
    google.maps.event.addDomListener(document.getElementById("center-button") as HTMLElement, "click", () => {
      this.map.setCenter(this.Hanoi);
      this.map.setZoom(14.5);
    })


    //


  }

}



