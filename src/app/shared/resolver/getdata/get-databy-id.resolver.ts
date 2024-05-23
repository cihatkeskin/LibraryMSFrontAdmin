import { ResolveFn } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { CrudService } from '../../../core/services/crud/crud.service';
import { inject } from '@angular/core';

export const getDatabyIdResolver: ResolveFn<Observable<any>> = async(route, state) => {
  const crudService = inject(CrudService)

  var id = route.paramMap.get("id") as string;
  var controller = route.data['controller'];
  var data$ = new ReplaySubject<any>();

  await crudService.get<Observable<any>>({
    controller:controller
  },id).subscribe((x:any)=>{
    data$.next(x);
  });
  return data$;
};
