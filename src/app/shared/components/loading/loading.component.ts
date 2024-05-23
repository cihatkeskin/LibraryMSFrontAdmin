import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoadingService } from '../../../core/services/loading/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
/**
 *
 */
constructor(
  private loadingService:LoadingService
) {
}
get getLoadingStatus(){
  return this.loadingService.isLoading;
  // console.log(this.loadingService.requesCount)

  // return this.loadingService.requesCount > 0 ;

}
}
