import { Component, OnInit, ViewChild, NgZone, ElementRef } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { LocationService } from '../service/locationservice';
import { Location } from '../domain/location';
import { google } from 'google-maps';



declare var google: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styles: [`
      .map-body{
      }`
  ]
})
export class MapComponent implements OnInit {

    lat: number|any;

    lng: number|any;

    zoom: number|any;

    radius: string|any;

    options: any;

    overlays: any[];

    geoCoder: any;

    addressSearch: any;

    searchResult: any

    infoWindow: any;

    map: any;

    marker: any;

    searchBody: string;

    markerLatLng: any | any[] = [];

    markerInsideRadius: any | any[] = [];

    listlocation: Location[];


    @ViewChild('search') public searchElementRef: ElementRef | any;

    setMap(event: any){
      this.map = event.map;
    }

    setCurrentLocation(){
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.zoom = 10;
      });
    }}

    constructor(
      private breadcrumbService: BreadcrumbService,
      private locationService: LocationService,
      private ngZone: NgZone) {
        this.breadcrumbService.setItems([
          { label: 'Map', routerLink: ['/map'] }
        ]);
    }

    ngOnInit() {

      this.setCurrentLocation();

      this.options = {
        center: {lat: 20.5929854, lng: 106.2198553},
        zoom: 8
      };

      this.overlays = []

      this.locationService.getLocation()
      .then((data) => {
          this.listlocation = data;
      });

      this.geoCoder = new google.maps.Geocoder();

      let autocomplete = new google.maps.places.Autocomplete(
          this.searchElementRef.nativeElement
      );

      autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {

            let place: google.maps.places.PlaceResult = autocomplete.getPlace();

            if (!place.geometry || !place.geometry.location) {
              window.alert("Address not found: '" + place.name + "'");
              return;
            }
            if (place.geometry.viewport) {
              this.map.fitBounds(place.geometry.viewport);
            } else {
              this.map.setCenter(place.geometry.location);
              this.map.setZoom(10);
            }

            var placeLoc = place.geometry.location;
            var marker = new google.maps.Marker({
              position: placeLoc
            });
            marker.setMap(this.map);

            this.lat = place.geometry.location.lat();
            this.lng = place.geometry.location.lng();
            this.addressSearch = place.formatted_address;

            var contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>'+
            '<p><h4 id="address" class="address">'+ this.addressSearch + '</h4></p>'
            '</div>';

            var infoWindow = new google.maps.InfoWindow();

            marker.addListener("click", () => {
              infoWindow.setContent(contentString);
              infoWindow.open({
                anchor: marker,
              })
            })

            // radius
            var bounds = this.map.getBounds()
            var center = bounds.getCenter();
            var ne = bounds.getNorthEast();

            var _radius = google.maps.geometry.spherical.computeDistanceBetween(center, ne);
            console.log("Radius: ", _radius);
            this.radius = _radius;
          })

          var body = {
            address: this.addressSearch,
            lat: this.lat,
            lng: this.lng,
            radius: this.radius,
          };

          this.searchResult = body;
          var searchLoc = new google.maps.LatLng(body.lat, body.lng);

          this.locationService.getLocation()
          .then((data) => {
            var temp2: Object[] | any;
            temp2 = data;

            this.markerLatLng = temp2.map(locat => {
              var lat: number = +locat.lat;
              var lng: number = +locat.lng;
              var radius: number = +locat.radius;
              var address = locat.address;

              return {
                address: address,
                lat: lat,
                lng: lng,
                radius: radius
              };
            });

            let temp3 = this.markerLatLng;

            this.markerInsideRadius = temp3.filter((loc: any) => {
                var markerLoc = new google.maps.LatLng(loc.lat, loc.lng);
                const distanceInM = google.maps.geometry.spherical.computeDistanceBetween(markerLoc, searchLoc);
                if(distanceInM < 15000){
                  return loc;
                }
            });
            console.log('Result Inside Radius: ', this.markerInsideRadius);

            for(let i in this.markerInsideRadius){

                let locCircle = new google.maps.Circle({
                  strokeColor: "#FF0000",
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: "#FF0000",
                  fillOpacity: 0.35,
                  center: new google.maps.LatLng( this.markerInsideRadius[i].lat, this.markerInsideRadius[i].lng),
                  radius: this.markerInsideRadius[i].radius,
                });
                locCircle.setMap(this.map);

                let content = '<div>' +
                '<div id="siteNotice">' +
                '</div>'+
                '<p><h4 id="address" class="address">'+ this.markerInsideRadius[i].address + '</h4></p>'
                '</div>';

                let info = new google.maps.InfoWindow();

                (function(){
                  locCircle.addListener('click', (ev) =>{
                    info.setPosition(ev.latLng);
                    info.setContent(content);
                    info.open({
                      anchor: locCircle
                    });
                  })
                }());

            }

          });
      });

    }

}
