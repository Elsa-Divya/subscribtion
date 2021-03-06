import { OrdersPage } from '../../pages/orders/orders';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CatalogPage } from '../catalog/catalog';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  ordersList : any[];
  settings:any;
  data:any;
  constructor(public navCtrl: NavController) {
  
  }

  getOrderDetails(){
     
    this.navCtrl.push(OrdersPage);
  }

  uploadCatalog(){
    this.navCtrl.push(CatalogPage);
  }

}
