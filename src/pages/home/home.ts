import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Pessoa } from '../../models/pessoa.model';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  
  constructor(public navCtrl: NavController, private camera: Camera) {
    
  }
  
  ngOnInit(): void {
    this.pessoasParaSortear = this.clonaSorteados();

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      //let base64Image = 'data:image/jpeg;base64,' + imageData;

      console.log(imageData);


      }, (err) => {
      // Handle error
      });

  }

  pessoaPadrao: Pessoa = {
    id: 0,
    nome: 'Daily App',
    foto: 'assets/imgs/sorteio.png'
  };
  funcionarios: Array<Pessoa> = [
    {id: 1, nome: 'Rafa', foto: 'assets/imgs/rafa.jpg'},
    {id: 2, nome: 'Toni', foto: 'assets/imgs/toni.jpg'},
    {id: 3, nome: 'Daniel', foto: 'assets/imgs/daniel.jpg'},
    {id: 4, nome: 'Lennon', foto: 'assets/imgs/Lenu.jpg'},
    {id: 5, nome: 'Paola', foto: 'assets/imgs/paola.jpg'},
  ];


  pessoasParaSortear: Array<Pessoa>;
  
  sorteando: boolean = false;
  numeroSorteados: number = 4;
  sorteado: Pessoa = this.pessoaPadrao;

  private clonaSorteados(): Array<Pessoa> {
    return [...this.funcionarios];
  }

  private procurarIndiceArray(objeto: any, atributo: any, valor: any) {
    for(var i = 0; i < objeto.length; i += 1) {
        if(objeto[i][atributo] === valor) {
            return i;
        }
    }
    return -1;
  }

  private removerSorteado() {
    let index = this.procurarIndiceArray(this.pessoasParaSortear, 'id', this.sorteado.id);
    this.pessoasParaSortear.splice(index, 1);
    this.numeroSorteados--;

    console.log(this.funcionarios);
  }

  public resetar() {
    this.sorteado = this.pessoaPadrao;
    this.numeroSorteados = 4;
    this.pessoasParaSortear = this.clonaSorteados();
  }

  public sortear() {
    if(this.numeroSorteados > 0) {
      this.sorteando = true;
      var count = 0;
      var id = setInterval((res) => {
        if(count < 20) {
          this.sorteado = this.pessoasParaSortear[(Math.random() * this.numeroSorteados).toFixed(0)]; 
          if(this.numeroSorteados == 0) {
            this.sorteando = false;
          }
          count++;
        } else {
          
          this.sorteando = false;
          this.removerSorteado();
          clearInterval(id);
        }
      }, 50)

    } else {
      console.log(this.pessoaPadrao);
      this.sorteado = this.pessoaPadrao;
    }
    
  }

}
