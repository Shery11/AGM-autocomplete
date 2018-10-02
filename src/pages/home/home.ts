import { Component, NgZone, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FormControl} from "@angular/forms";
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

import { MouseEvent } from '@agm/core';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    public latitude: number;
    public longitude: number;
    public searchControl: FormControl;
    public zoom: number;

    markers: marker[] = []

    @ViewChild("search")
    public searchElementRef;

  constructor(public navCtrl: NavController, private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone)  {
      this.zoom = 4;
      this.latitude = 39.8282;
      this.longitude = -98.5795;

      //create search FormControl
      this.searchControl = new FormControl();

      //set current position
      this.setCurrentPosition();

  }


  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  mapClicked($event: MouseEvent) {
      console.log($event);
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }
  
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  

  ionViewDidLoad() {
      //set google maps defaults
      this.zoom = 4;
      this.latitude = 39.8282;
      this.longitude = -98.5795;

      //create search FormControl
      this.searchControl = new FormControl();

      //set current position
      this.setCurrentPosition();

      //load Places Autocomplete
      this.mapsAPILoader.load().then(() => {
          let nativeHomeInputBox = document.getElementById('txtHome').getElementsByTagName('input')[0];
          let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
              types: ["address"],
              componentRestrictions: {country: 'pk'}
          });
          autocomplete.addListener("place_changed", () => {
              this.ngZone.run(() => {
                  //get the place result
                  let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                  //verify result
                  if (place.geometry === undefined || place.geometry === null) {
                      return;
                  }

                  //set latitude, longitude and zoom
                  this.latitude = place.geometry.location.lat();
                  this.longitude = place.geometry.location.lng();

                  console.log(this.latitude,this.longitude);
                  this.zoom = 12;
              });
          });
      });
  }

    private setCurrentPosition() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 12;
            });
        }
    }

}


interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}