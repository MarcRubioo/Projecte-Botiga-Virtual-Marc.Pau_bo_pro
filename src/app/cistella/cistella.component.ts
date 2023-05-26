import {Component, OnInit} from '@angular/core';
import {ServeiService} from "../servei.service";
import {HttpClient} from "@angular/common/http";
import {DatePipe} from "@angular/common";

declare global {
  interface Window {
    ethereum: any;
  }
}

declare let window: any;

@Component({
  selector: 'app-cistella',
  templateUrl: './cistella.component.html',
  styleUrls: ['./cistella.component.css']
})


export class CistellaComponent implements OnInit{

  mostrar: any;
  cistella = this.s.agafarProCataleg()
  preuPoducte: number | undefined;
  simbolMoneda: any;
  preuActual: number | undefined;
  monedaHistorial: any;
  email_login = localStorage.getItem('email');
  preuTrans: any;






  constructor(private s:ServeiService, private http: HttpClient, private datePipe: DatePipe) {


  }


  ngOnInit() {
    const subject = document.querySelector('#subject')!;
    subject.insertAdjacentHTML('afterend',this.mostrar)

    console.log(this.mostrar)

   }


  async seleccionarMoneda($event: Event) {

    const apiJSON = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,binancecoin,ethereum,dollars&vs_currencies=eur')
    const valors = await apiJSON.json();

    var select = document.getElementById("moneda");
    // @ts-ignore
    var opcionSeleccionada = select.value;

    if (opcionSeleccionada === "opcion1") {
      this.preuPoducte = this.preutotalcistella();
      this.simbolMoneda = " €";
      this. preuActual = 1;
      this.monedaHistorial = "EUR"
      console.log("Se seleccionó EURO");

    } else if (opcionSeleccionada === "opcion2") {
      this.preuPoducte = this.preutotalcistella() / valors.dollars.eur;
      this.simbolMoneda = " $";
      this. preuActual = valors.dollars.eur;
      this.monedaHistorial = "DOLL"
      console.log("Se seleccionó DOLL");

    } else if (opcionSeleccionada === "opcion3") {
      this.preuPoducte = this.preutotalcistella() / valors.bitcoin.eur;
      this.simbolMoneda = " BTC";
      this. preuActual = valors.bitcoin.eur;
      this.monedaHistorial = "BTC"
      console.log("Se seleccionó BTC");

    } else if (opcionSeleccionada === "BNB") {
      this.preuPoducte = this.preutotalcistella() / valors.binancecoin.eur;
      this. preuActual = valors.binancecoin.eur;
      this.simbolMoneda = " BNB";
      this.monedaHistorial = "BNB"
      console.log("Se seleccionó BNB");
    }
    this.preuTrans = this.preutotalcistella()/ valors.binancecoin.eur;
  }


  public preutotalcistella():number {
    let totalcistella: number = 0;
    for(let producte of this.cistella){
      totalcistella+=(producte.preu)
    }
    return totalcistella;
  }

  EliminarCistellaCompleta(){
    this.cistella = [];
    return this.cistella;
  }


  user = this.email_login;
  data_prod : any;

  async pagar(pagar: string) {


    const data1 = new Date()
    const formatdata = data1.toDateString() + " hora: " +data1.getHours() + ":" + data1.getMinutes()

    const text ={
      text: `/ Data: ${formatdata} Usuari: Acció: Pagar cistella \n`
    }



    const data = new Date();
    this.data_prod= this.datePipe.transform(data,'yyyy-MM-dd');

    if (this.user == null){
      alert("Primer inicia sessió amb un usuari")
    }

    else {

      const apiJSON = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,binancecoin,ethereum,dollars&vs_currencies=eur')
      const valors = await apiJSON.json();

      for(let i=0;i<this.cistella.length;i++){

        let quant;

        if (this.monedaHistorial == "DOLL"){
          quant = this.cistella[i].preu / valors.dollars.eur;
        }

        else if (this.monedaHistorial == "BTC"){
          quant = this.cistella[i].preu / valors.bitcoin.eur;
        }

        else if (this.monedaHistorial == "BNB"){
          quant = this.cistella[i].preu / valors.binancecoin.eur;
        }

        else {
          quant = this.cistella[i].preu;
        }

        let query = `INSERT INTO botigaprjmarcpau.historial (usuari, producte , oferta, data, moneda, quantitat) VALUES (?,?,?,?,?,?)`;
        let values =[this.user,this.cistella[i].nom,false,this.data_prod, this.monedaHistorial, quant];

        console.log('Producte afegit')

        this.http.post('http://localhost:3080/afegir_prod_histo',{query, values}).subscribe();
      }

      this.http.post<any>("http://localhost:3080/log/pagar/cistella", text).subscribe();

      this.s.EliminarCistellaCompleta()

      alert('Has realitzat la compra')


      // window.location.reload()

    }
  }

  async realitzarPagament(): Promise<void> {

    try {

      alert("Trassacció feta!!!")

      const contaOrigen = await this.s.getAccount();


      const contaDesti = '0x004bE6f502cB5F0Dd43BD13aa14C51EE3B90e060';

      await this.s.transferValue(contaOrigen, contaDesti, this.preuTrans);
      console.log('Pagament realitzat amb èxit!');
      console.log(this.preutotalcistella())

    } catch (error) {
      console.error('Error en realitzar el pagament:', error);
    }
  }

}
