import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  npm: any;
  pin: any;
  constructor(
  	public navCtrl: NavController,
  	public http: HttpClient
  ){}

  login(){
  	let api = 'https://api.unira.ac.id/v1/token';
  	let params = new HttpParams()
  		.append('username',this.npm)
  		.append('password',this.pin);
  	this.http.post(api,params).subscribe(data=>{
  		localStorage.setItem('refreshToken',data['data']['attributes']['refresh']);
  		localStorage.setItem('accessToken',data['data']['attributes']['access']);
  		this.saya();
  	}, error=>{
  		console.log(error);
  	})
  }

  saya(){
  		let myHeaders = new HttpHeaders();
  		let api = 'https://api.unira.ac.id/v1/saya';
  		let token = localStorage.getItem('accessToken');
		myHeaders.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
		myHeaders.append('Authorization', 'Bearer '+token);

		this.http.post(api, { headers: myHeaders}).subscribe(data => {
			console.log(data);
		},error=>{
			console.log(error);
		})

  }

}
