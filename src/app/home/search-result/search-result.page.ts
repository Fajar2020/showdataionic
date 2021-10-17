import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../home.service';
import { Router } from '@angular/router';

import { LocationModel } from '../model/location.model';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.page.html',
  styleUrls: ['./search-result.page.scss'],
})
export class SearchResultPage {

  searchDatas: any[]=[];
  page=1;
  cityId: number;
  unfinish=true;

  fromLoadMore=false;

  selectedLocation: LocationModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: HomeService,
    private router: Router
  ) {
    this.getFromStorage();
  }

  async getFromStorage(){
    this.activatedRoute.paramMap.subscribe(param=>{
      if(!param.has('cityId')){
        return;
      }
      this.cityId=+param.get('cityId');
      this.getSearchData({locId: param.get('cityId'), page:this.page, limit:10});
    });

  }

  async getSearchData(params: any){
    this.service.searchData({locId:params.locId, id:params.id, page:params.page, limit:params.limit}).subscribe((res: any)=>{
      if(res.results.length<=0){
        this.unfinish=false;
        return;
      }
      if(this.fromLoadMore){
        this.searchDatas=[...this.searchDatas, ...res.results];
      }else{
        this.searchDatas=res.results;
      }

    });
  }

  loadData(event) {
    setTimeout(() => {
      this.page++;
      this.fromLoadMore=true;
      if(this.unfinish){
        this.fromLoadMore=false;
        this.getSearchData({locId: this.cityId, page:this.page, limit:10});
      }

      event.target.complete();
    }, 500);
  }

  selectedData(item: any){
    this.fromLoadMore=false;
    this.router.navigate(['/home/detail/'+item.id]);
  }

}
