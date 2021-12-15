import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Location } from '../domain/location';

@Injectable()
export class LocationService {
    constructor( private http: HttpClient) {}

    getLocation(){
        return this.http.get<any>('assets/demo/data/location.json')
        .toPromise()
        .then(res => <Location[]> res.data)
        .then(data => data);
    }
}