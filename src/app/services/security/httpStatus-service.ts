import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, finalize, map } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

/*
  Serviço responsável por setar o status http para verdadeiro ou falso.
  Também pode ser invocado manualmente se necessário.
*/
@Injectable()
export class HTTPStatusService {
  private requestInFlight$: BehaviorSubject<boolean>;
  constructor() {
    this.requestInFlight$ = new BehaviorSubject(false);
  }

  setHttpStatus(inFlight: boolean) {
    this.requestInFlight$.next(inFlight);
  }

  getHttpStatus(): Observable<boolean> {
    return this.requestInFlight$.asObservable();
  }
}

/*
  Serviço responsável por controlar o status http entre as requisições.
  Enquanto houverem requisições http em andamento (em paralelo), o status http se mantém verdadeiro.
  Ao se encerrar todas as requisições http, o status é modificado para falso.
*/
@Injectable()
export class HTTPListener implements HttpInterceptor {  
  requisicoesAtivas: number;
  constructor(private status: HTTPStatusService) {
    this.requisicoesAtivas = 0;
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const hideLoading = new URL(req.urlWithParams).searchParams.get('loading');
    if(!hideLoading)
    {
      this.status.setHttpStatus(true);
      this.requisicoesAtivas++;
    }

    return next.handle(req).pipe(
      map(event => {        
        return event;
      }),
      catchError(error => {
        return Observable.throw(error);
      }),
      finalize(() => {
        if(!hideLoading){
          this.requisicoesAtivas--;
          if(this.requisicoesAtivas <= 0) {
            this.requisicoesAtivas = 0;
            this.status.setHttpStatus(false);
          }
        }
      })
    )
  }
}