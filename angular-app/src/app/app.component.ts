import { Component, OnInit } from '@angular/core';
import { CakeService } from './cake.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Rate My Cakes';
  cakes: any;
  cake: any;
  rateCake: any; 
  newCake: any;
  // ratings: [{rating:"5 stars"}, {rating:"4 stars"}, {rating:"3 stars"}, {rating:"2 stars"}, {rating:"1 star"}];
  constructor(private _cakeService: CakeService){

  }
  ngOnInit(){
    this.newCake = { baker: "", image: ""}
    this.rateCake = {_id: "", rating: "", comment: "" };
    this.getCakesFromService();
  }

  getCakesFromService(){
    let obs = this._cakeService.getCakes();
    obs.subscribe( data => {
      console.log("+@@@@+Got our cakes from the DB!+@@@@+", data)
      this.cakes = data;
    })
  }

  onNewCakeSubmit(){
    let obs = this._cakeService.addNewCake(this.newCake);
    obs.subscribe(data => {
      console.log("@@@@@@@created a new cake@@@@@@@@", data);
      this.getCakesFromService();
    });
    this.newCake = { baker: "", image: "" }
  }

  onNewCakeRatingSubmit(id,cake ){
    let obs = this._cakeService.rateACake(id, this.rateCake)
    obs.subscribe(data => {
      console.log("+++++rated a cake++++++")
      this.getCakesFromService()
    })
    this.rateCake = {_id: "", rating: "", comment: "" };
  }



}
