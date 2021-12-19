import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {


  ngOnInit(): void {
    const Hanoi: any = {
      lat: 21.028511,
      lng: 105.804817,
    };

    const mapOptions = {
      zoom: 8,
      center: Hanoi,
    };

    const map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      mapOptions
    );

    let zone_01 = new google.maps.Marker({
      position: {
        lat: 21.02685574744757,
        lng: 105.85730111936786 ,
      },

     
      map: map,
    });

    const info1 = new google.maps.InfoWindow({
      content: "<p>Layer :&nbsp 1;</p>"
      +"<p>BinCount:</p>1"
      +"<p>MtdCount:</p>1"
      +"<p>Population: &nbsp60.49230769230801;</p>"
    })

    zone_01.addListener("click", () => {
      info1.open({
        anchor: zone_01,
        map,
        shouldFocus: false,
      });
    });

    const zone_01data = [
      { lat: 21.028654384565524, lng: 105.85841365901365,},
      { lat: 21.026855732977843, lng: 105.85952617180808, },
      { lat: 21.02505710309476, lng: 105.85841363216345,  },
      { lat: 21.02505710309476, lng: 105.85618860657226 ,},
      { lat: 21.026855732977843, lng: 105.85507606692762 ,},
      { lat: 21.028654384565524, lng: 105.85618857972206  ,},
      { lat: 21.028654384565524, lng: 105.85841365901365 ,},
    ];
  
    // Construct the polygon.
    const zone_01_area = new google.maps.Polygon({
      paths: zone_01data,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
    });
  
    zone_01_area.setMap(map);


    let zone_02 = new google.maps.Marker({
      position: {
        lat: 21.035849113890595,
        lng: 105.86063845639892 ,
      },
      
    map:map
    });

    const info2 = new google.maps.InfoWindow({
      content: "<p>Layer :&nbsp 1;</p>"
      +"<p>BinCount:</p>0"
      +"<p>MtdCount:</p>null"
      +"<p>Population: &nbsp null;</p>"
    })

    zone_02.addListener("click", () => {
      info2.open({
        anchor: zone_02,
        map,
        shouldFocus: false,
      });
    });

    const zone_02data = [
      { lat: 21.03764775100685, lng: 105.86175106319631,},
      { lat: 21.035849099414083, lng: 105.86286364312811, },
      { lat: 21.034050469536087, lng: 105.8617510363319,  },
      { lat: 21.034050469536087, lng: 105.85952587646595 ,},
      { lat: 21.035849099414083, lng: 105.85841326966973 ,},
      { lat: 21.03764775100685, lng: 105.85952584960154  ,},
      { lat: 21.03764775100685, lng: 105.86175106319631 ,},
    ];
  
    // Construct the polygon.
    const zone_02_area = new google.maps.Polygon({
      paths: zone_02data,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#grey",
      fillOpacity: 0.35,
    });

    zone_02_area.setMap(map);

    
}
}