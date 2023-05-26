import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProducteBoti} from "./producte-boti";
import Web3 from "web3";


class Productes {
}

@Injectable({
  providedIn: 'root'
})
export class ServeiService {

  private web3: Web3 | undefined;

  cistella: ProducteBoti[]= [];

  afegircistella(product: ProducteBoti){
    this.cistella.push(product);
  }

  agafarProCataleg(){
    return this.cistella;
  }

  EliminarCistellaCompleta(){
    this.cistella = [];
    return this.cistella;
  }


  constructor(private http: HttpClient) {
    this.initWeb3();
  }



  private initWeb3(): void {
    //@ts-ignore
    if (typeof window.ethereum !== 'undefined') {
      //@ts-ignore
      this.web3 = new Web3(window.ethereum);
    } else {
      console.error('MetaMask no està instal·lat o no és compatible amb aquest navegador.');
    }
  }

  getAccount(): Promise<string> {
    // @ts-ignore
    return this.web3.eth.getAccounts().then((accounts: string[]) => accounts[0]);
  }

  transferValue(senderAddress: string, recipientAddress: string, value: number): Promise<void> {
    const decimals = 18;
    const bnbToWeiConversionRate = 10 ** decimals;
    const valueInWei = Math.round(value * bnbToWeiConversionRate);
    const web3 = new Web3(window.ethereum);

    // @ts-ignore
    return web3.eth.sendTransaction({
      from: senderAddress,
      to: recipientAddress,
      value: web3.utils.toBN(valueInWei),
      gas: 21000,
    });
  }





}
