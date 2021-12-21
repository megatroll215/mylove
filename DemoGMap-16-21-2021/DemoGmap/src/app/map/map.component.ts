import {Component, forwardRef, OnInit} from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import {default as data} from 'data.json';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {


  displayInfo(info: google.maps.InfoWindow): void{
    info.open();
  }
  ColorIntension(population: any): string{
    if(population == null || population<0) return "#ffffff";
     else if(population>500) return " #ff3300";
     else if(population>400 && population<=500) return " #ff6600";
     else if(population>300 && population<=400) return " #ff9933";
     else if(population>200 && population<=300) return " #ffcc00";
     else if(population>100 && population<=200) return " #ffff66";
     else return " #aaff80";
  }
  ngOnInit(): void {


    const Hanoi: any = {
      lat: 21.028033,
      lng: 105.851242,
    };

    const mapOptions = {
      zoom: 15,
      center: Hanoi,
    };

    const map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      mapOptions
    );

//end zone 3
    // Create a <script> tag and set the USGS URL as the source.


   for(let i = 0; i<data.zone.length;i++){
     const center = data.zone[i].center;
     const location = new google.maps.LatLng(center.lat,center.lng);


     const info = new google.maps.InfoWindow({
       content: "<p>Layer :&nbsp " + data.zone[i].layer+ "</p>"
         +"<p>BinCount: "+data.zone[i].binCount+"</p>"
         +"<p>MtdCount:"+data.zone[i].mtdCount+"</p>"
         +"<p>Population: &nbsp"+ data.zone[i].population+"</p>",

       position: center
     })


    let hexagons = data.zone[i].hexagon;
     let zone_data :google.maps.LatLng[]|undefined;



     const zone_area = new google.maps.Polygon({
       paths: hexagons,
       strokeColor: "#FF0000",
       strokeOpacity: 0.8,
       strokeWeight: 2,
       fillColor: this.ColorIntension(data.zone[i].population),
       fillOpacity: 0.35,
     });

     google.maps.event.addListener(zone_area,"click",function(){
       info.open(map);
     });

     zone_area.setMap(map);

    }
}

  }


// Loop through the results array and place a marker for each
// set of coordinates.


