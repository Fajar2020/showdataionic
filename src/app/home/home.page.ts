import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from './home.service';
import { LocationModel } from './model/location.model';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{

  originalData: LocationModel[]=[];
  items: LocationModel[]=[];
  searchDisabled=true;
  selectedItem: LocationModel;


  constructor(
    private service: HomeService,
    private router: Router
  ) {
    this.getLocationData();
  }

  inputChanged($event){
    const value=$event.target.value;
    if(value.length<=0){
      this.items=[];
      return;
    }
    this.items=this.originalData.filter(item=>item.title.toLowerCase().includes(value.toLowerCase()));
  }

  selected(item, location){
    location.value=item.title;
    this.items=[];
    this.searchDisabled=false;
    this.selectedItem=item;
  }

  searchData(){
    this.router.navigate(['/home/search-result/'+this.selectedItem.id]);
  }

  async getLocationData(){
    this.service.getLocation().subscribe((res: any)=>{
      res.results.forEach(element => {
        element.title=element.name+' ,'+element.state+' ,'+element.country;
      });
      this.originalData=res.results;
    });
  }
}
