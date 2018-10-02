import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import * as firebase from 'firebase/app';

import * as geofirex from 'geofirex';


import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });


    firebase.initializeApp({
      apiKey: "AIzaSyB5rfOtfzTE8cHnLDTyhoKBou-BSbkFJ_U",
      authDomain: "uberuptest.firebaseapp.com",
      databaseURL: "https://uberuptest.firebaseio.com",
      projectId: "uberuptest",
      storageBucket: "uberuptest.appspot.com",
      messagingSenderId: "563944233944"
    });

    const geo = geofirex.init(firebase);
  }
}

