
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import axios from "axios";





@Injectable()
export class LocationService{

  getLocation(url: string){

    return axios.get(url)
  }
}
