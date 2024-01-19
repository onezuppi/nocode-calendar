import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
    ) {}


    /**
     * TODO выпилить костыть
     * @param {HttpRequest<any>} request
     * @param {HttpHandler} next
     * @returns {Observable<HttpEvent<any>>}
     */
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken: string =
            'eyJhbGciOiJSUzI1NiIsImtpZCI6IjFERkIzODk1MDMwRTc1M0E4NTQ2Njg2OTAyMkQzQzc5N0U5MkM1Q0FSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6IkhmczRsUU1PZFRxRlJtaHBBaTA4ZVg2U3hjbyJ9.eyJuYmYiOjE3MDU2NjIyNDMsImV4cCI6MTcwNjAyMjI0MywiaXNzIjoiaHR0cDovL2lkc3J2LWFwaS1zZXJ2aWNlIiwiY2xpZW50X2lkIjoiY2FsZW5kYXItdGVzdCIsInN1YiI6IjdkNGRkNDU2LTY2YzEtNDYzOS1iZjE3LTY2ZTZlYTBlZGQyOCIsImF1dGhfdGltZSI6MTcwNTY2MjI0MywiaWRwIjoibG9jYWwiLCJuYW1lIjoic2VyZWdhcGF4Iiwicm9sZSI6WyJjbGllbnQtc2FkbyIsIjA4NTgxZWU5LTY5YTctNGJkMC04YzJhLTVkZjU2N2E4ZGVmMCJdLCJzZWN1cml0eXN0YW1wIjoiSURJU1pCMlhKMk9CVEs3SVBIUjVXRkNPUUJCSTdQVUkiLCJjYWJpbmV0SWQiOiI1Mjk4ODFlYi1lOTg3LTQ1YzktOTgxNC1hODNiZmYwMWU3NDkiLCJDbGllbnRGaW8iOiJEb3Jva2hvdiBTZXJnZXkgVmxhZGltaXJvdmljaCIsImp0aSI6IjFDRjdEMUNCMzE3RDI2RUIzRkI4QjMzMUZDMzAwRDdBIiwic2lkIjoiZDVhNGYwNDAtZjQ1Ni00ZTI1LTlhODYtY2Y1YWU2NjE0M2NiIiwiaWF0IjoxNzA1NjYyMjQzLCJzY29wZSI6WyJJZGVudGl0eVNlcnZlckFwaSIsIm9wZW5pZCIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwYXNzd29yZCJdfQ.Zr9FAUmnZHPxtJ-gYT02hFOTcFeNOnZ183_MJsW738d-OdF4sKpA95GJoFj5IlOCUzM6ioy8UPtLEc5QEh_d4yo8NXgO1oUlzUagvDuczXg2YJHQLkO5GtVcoljF4luHenRSlwA4apDWmtAyK1BeSC7SzVHFpSncbtk90yGToGLIkUHj93JqV6SEs81py8MiYaemxScLt3ikMDoVR9l6ZZoUq1dURY9eRScAjNSVbwUwgIMFqOUHjuySyYQaepHI3272KRzatUsSoJBdN2je8p_7kvyTBWYwV5tCfuF7LVEEZLNTPyI4IXJacC5Ura5zgT4A3bAQyo0-Mla1x6acEw';

        const authRequest: HttpRequest<any> = request.clone({
            setHeaders: {
                Authorization: `Bearer ${authToken}`
            }
        });

        return next.handle(authRequest);
    }
}
