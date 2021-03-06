import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AgendamentosPage } from '../pages/agendamentos/agendamentos';
import { PerfilPage } from "../pages/perfil/perfil";

//import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  public paginas = [
    {titulo: 'Agendamentos', componente: AgendamentosPage },
    {titulo: 'Perfil', componente: PerfilPage}
  ];

  @ViewChild(Nav) public nav:Nav;



  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  abrePagina(pagina): void {
    this.nav.push(pagina.componente);
  }
}

