import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HomeService } from '../home.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  safeUrlMap: SafeUrl;
  detailData: any=null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: HomeService,
    private sanitizer: DomSanitizer
  ) {
    this.getFromStorage();
  }

  ngOnInit() {
  }

  async getFromStorage(){
    this.activatedRoute.paramMap.subscribe(param=>{
      if(!param.has('id')){
        return;
      }
      this.service.getDetailData(+param.get('id')).subscribe((res: any)=>{
        if(res.results.length){
          this.detailData=res.results[0];
          const url='https://maps.google.com/maps?q='+this.detailData.locat.name+'&t=&z=13&ie=UTF8&iwloc=&output=embed';
          this.safeUrlMap=this.sanitizer.bypassSecurityTrustResourceUrl(url);
        }
      });
    });

  }

}
