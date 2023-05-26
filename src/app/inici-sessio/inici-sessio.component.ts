import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-inici-sessio',
  templateUrl: './inici-sessio.component.html',
  styleUrls: ['./inici-sessio.component.css']
})
export class IniciSessioComponent implements OnInit{
  emailLog: string='';
  passLog: string='';

  constructor( private router: Router, private http: HttpClient) {

  }

  ngOnInit() {
  }

  async obrirWallet() {
    //@ts-ignore
    if (typeof window.ethereum !== 'undefined') {
      //@ts-ignore
      const wallet = window.ethereum;
      wallet
        .send('eth_requestAccounts')
        .then((accounts: string[]) => {
          const count = accounts[0];
          console.log('Sesión iniciada:', count);

        })
        .catch((error: any) => {
          console.log('Error: ', error);
        });
    } else {
      console.log('Metamask no instal·lat');
    }



    // if (window.ethereum) {
    //   try {
    //     // Request account access from the user
    //     await window.ethereum.request({ method: 'eth_requestAccounts' });
    //     console.log('User has logged in with MetaMask!');
    //
    //     // Additional logic after successful login
    //
    //   } catch (error) {
    //     console.error('Error logging in with MetaMask:', error);
    //   }
    // } else {
    //   console.error('MetaMask is not installed');
    // }
  }





  login($myParam: string = ''): void{
    const nav: string[] = ['']
    if($myParam.length) {
      nav.push($myParam);
    }
    this.router.navigate(nav)



    var resultat: Object =false;

    let req = new HttpParams().set('email',this.emailLog);
    let req2 = new HttpParams().set('passw',this.passLog);
    this.http.get("http://localhost:3080/email", {params: req}).subscribe((client)=>{
      resultat=client;
      if(resultat==true){
        this.http.get("http://localhost:3080/pass", {params: req2}).subscribe((client)=> {
          resultat = client;
          if(resultat == true){
            alert("Inici de sessió correcte")
            alert("Iniciat el usuari amb l'"+req)

            const data = new Date()
            const formatdata = data.toDateString() + " hora: " +data.getHours() + ":" + data.getMinutes()
            const text ={
              text: `/ Data: ${formatdata} Usuari: ${this.emailLog} Acció: Inici de sessió correcte`
            }
            this.http.post<any>("http://localhost:3080/log/inici/sessioCorrecte", text).subscribe();

            localStorage.setItem('email', this.emailLog);

            this.obrirWallet()

            // window.location.reload();

          }
          else{
            alert("Contrasenya incorrecte")}
        })
      }else{

        alert("Email incorrece")}
    });
  }
}
