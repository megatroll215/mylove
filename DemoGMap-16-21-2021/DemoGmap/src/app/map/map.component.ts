import { Component, OnInit } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader"


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {






  ngOnInit(): void {

    let loader = new Loader(
      {
        apiKey:'AIzaSyA2zmfFiqBqvwBMOqEGlEzWqmSRAPaX3kM',
        version:'weekly'
      })



const Hanoi : any = {
  lat: 21.028511,
  lng: 105.804817
}

    const mapOptions = {
      zoom: 8,
      center: Hanoi,
    };
    let map : any;
    loader.load().then(() => new google.maps.Map(document.getElementById("map") as HTMLElement,mapOptions));




    const maker =  new google.maps.Marker({
      position:  Hanoi,
      map:new google.maps.Map(document.getElementById("map") as HTMLElement,mapOptions),
      icon:"https://www.pngkit.com/png/detail/14-142949_map-marker-icons-png-map-marker-icon-png.png"
    });


    const triangleCoords = [
      { lat: 25.774, lng: -80.19 },
      { lat: 18.466, lng: -66.118 },
      { lat: 32.321, lng: -64.757 },

    ];

    // Construct the polygon.
    const bermudaTriangle = new google.maps.Polygon({
      paths: triangleCoords,
      strokeColor: "#ffc800",
      strokeOpacity: 1,
      strokeWeight: 2,
      fillColor: "#ffbf00",
      fillOpacity: 0.35,
    });

    bermudaTriangle.setMap(map);
    const lineSymbol = {
      path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
    };

    const line = new google.maps.Polyline({
      path: [
        { lat: 22.291, lng: 153.027 },
        { lat: 18.291, lng: 153.027 },
      ],
      icons: [
        {
          icon: lineSymbol,
          offset: "100%",
        },
      ],
      map: map,
    });

  }



}
