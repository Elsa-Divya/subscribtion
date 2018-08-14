import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { FulfillmentDetailsProvider } from '../../providers/fulfillment-details/fulfillment-details';
import { ErrorHandlerServiceProvider } from '../../providers/error-handler-service/error-handler-service';
import { LoaderProvider } from '../../providers/loader/loader';

/**
 * Generated class for the PrintChallanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-print-challan',
  templateUrl: 'print-challan.html',
})
export class PrintChallanPage {
  orderId:number;
  noOfBags:number=0;
  passwordField: boolean;
  password: any;
  salesBill:string;
  empPassCodes:any[]=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public view:ViewController,private orders:FulfillmentDetailsProvider,private errorHandler:ErrorHandlerServiceProvider,private loader:LoaderProvider,public alert:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrintChallanPage');
   this.orderId = this.navParams.get('orderId');
  }

  print(){
    this.orders.printBill(this.orderId,this.noOfBags).subscribe((data:any)=>{
      console.log(data)
      this.salesBill = data.salesBill;
      this.empPassCodes = data.employeePassCodes;
        if(data.isPasscodeRequired){
          this.passwordField = true;
          this.showPrompt();
          //this.verifyPassword(this.password,data.employeePassCodes)
        }else{
          this.printElem(data.salesBill);
        }

        
     this.loader.hide();
    },(err:any)=>{
      this.errorHandler.error(err);
      this.loader.hide();
    },()=>{
      this.loader.hide();
    })
  }

  verifyPassword(password,passCodes){
    let hasMacth:boolean=false;
    hasMacth = passCodes.find(value=>{ return value==password})
    return hasMacth;
  }

  printElem(data) {
    var mywindow = window.open('', 'PRINT');

    if (mywindow == null || typeof(mywindow)=='undefined') {  
      alert('Please disable your pop-up blocker present in the top right corner and click the "Print" button again.'); 
      return;
  } 

    mywindow.document.write('<html><head>');
    mywindow.document.write('</head><body>');
    mywindow.document.write('<pre>' + data + '</pre>');
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
    mywindow.print();
    mywindow.close();

    return true;
}

  dismiss(){
    this.view.dismiss();
  }

  showPrompt() {
    let msg = "Please enter your passcode to print challan";
    const prompt = this.alert.create({
      title: 'Login',
      message: msg,
      inputs: [
        {
          name: 'passcode',
          placeholder: 'Enter Passcode'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Print',
          handler: data => {
            console.log('Saved clicked',data);
            if(this.verifyPassword(data,this.empPassCodes)){
              this.printElem(this.salesBill)
            }else{
              msg = "Invalid Passcode !";
            }
          }
        }
      ]
    });
    prompt.present();
  }

}
