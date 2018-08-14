import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ErrorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-error',
  templateUrl: 'error.html',
})
export class ErrorPage {

  errors: any[] = [];
  catalogError:any;
  productList:any[]=[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams ,public viewCtrl:ViewController) {

    if(navParams.get('errors') ){
      this.errors = navParams.get('errors');
    }else{
      this.errors.push('Something went wrong try again later !')
    }
    console.log(this.errors)
    if(navParams.get('catalogErr')){
      this.catalogError = JSON.parse(navParams.get('catalogErr'));
      this.productList = this.catalogError.subscriptionProducts;
    }else{
      this.catalogError = this.errors;
    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ErrorPage');
  }
  close(){
    this.viewCtrl.dismiss();
  }

}
