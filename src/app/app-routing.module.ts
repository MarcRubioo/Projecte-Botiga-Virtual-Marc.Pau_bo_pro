import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { CistellaComponent } from './cistella/cistella.component';
import { CatalegComponent } from './cataleg/cataleg.component';
import { PeuPaginaComponent } from './peu-pagina/peu-pagina.component';
import { FormulariComponent } from './formulari/formulari.component';
import { CondicionsComponent } from './condicions/condicions.component';
import { ContacteComponent } from './contacte/contacte.component';
import { PlanaPrincipalComponent } from './plana-principal/plana-principal.component';
import { NavegacioComponent } from './navegacio/navegacio.component';
import {RouterModule, Routes} from "@angular/router";
import {IniciSessioComponent} from "./inici-sessio/inici-sessio.component";
import {RobaComponent} from "./roba/roba.component";
import {AccesorisComponent} from "./accesoris/accesoris.component";
import {SuplementsComponent} from "./suplements/suplements.component";
import {DadesUserComponent} from "./dades-user/dades-user.component";
import {InfoExComponent} from "./info-ex/info-ex.component";


const routes: Routes = [
  {path: '' , component:PlanaPrincipalComponent},
  {path: 'cistella' , component:CistellaComponent},
  {path: 'registre' , component:FormulariComponent},
  {path: 'contacte' , component:ContacteComponent},
  {path: 'cataleg' , component:CatalegComponent},
  {path: 'condicions' , component:CondicionsComponent},
  {path: 'login' , component:IniciSessioComponent},
  {path: 'cataleg/roba' , component:RobaComponent},
  {path: 'cataleg/accessoris' , component:AccesorisComponent},
  {path: 'cataleg/suplements' , component:SuplementsComponent},
  {path: 'dadesUser' , component:DadesUserComponent},
  {path: 'InfoEx', component:InfoExComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
