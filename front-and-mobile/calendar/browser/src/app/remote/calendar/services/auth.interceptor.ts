import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
    ) {}


    /**
     * @param {HttpRequest<any>} request
     * @param {HttpHandler} next
     * @returns {Observable<HttpEvent<any>>}
     */
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken: string =
            'eyJhbGciOiJSUzI1NiIsImtpZCI6IjFERkIzODk1MDMwRTc1M0E4NTQ2Njg2OTAyMkQzQzc5N0U5MkM1Q0FSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6IkhmczRsUU1PZFRxRlJtaHBBaTA4ZVg2U3hjbyJ9.eyJuYmYiOjE3MDU2MDA2MDEsImV4cCI6MTcwNTk2MDYwMSwiaXNzIjoiaHR0cDovL2lkc3J2LWFwaS1zZXJ2aWNlIiwiY2xpZW50X2lkIjoiY2FsZW5kYXItdGVzdCIsInN1YiI6IjdkNGRkNDU2LTY2YzEtNDYzOS1iZjE3LTY2ZTZlYTBlZGQyOCIsImF1dGhfdGltZSI6MTcwNTYwMDYwMSwiaWRwIjoibG9jYWwiLCJuYW1lIjoic2VyZWdhcGF4Iiwicm9sZSI6WyJjbGllbnQtc2FkbyIsIjA4NTgxZWU5LTY5YTctNGJkMC04YzJhLTVkZjU2N2E4ZGVmMCJdLCJzZWN1cml0eXN0YW1wIjoiSURJU1pCMlhKMk9CVEs3SVBIUjVXRkNPUUJCSTdQVUkiLCJjYWJpbmV0SWQiOiI1Mjk4ODFlYi1lOTg3LTQ1YzktOTgxNC1hODNiZmYwMWU3NDkiLCJDbGllbnRGaW8iOiJEb3Jva2hvdiBTZXJnZXkgVmxhZGltaXJvdmljaCIsImp0aSI6IkJGNTJCMTk3NDRBQjE1MDc3NzUyREJDQzEzQzREMkJFIiwic2lkIjoiNDQ3YTEzMjctODRmOC00NWViLTg5NjMtN2IwYTFjY2Y5N2ZlIiwiaWF0IjoxNzA1NjAwNjAxLCJzY29wZSI6WyJJZGVudGl0eVNlcnZlckFwaSIsIm9wZW5pZCIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwYXNzd29yZCJdfQ.P6SHCOWBt9ekGECdvGh-hH6GGYfX8de6gEpWOfhZmTMIbIUw8Qi7ySwUGzOv4Dw1jrtIKg_M_W4iLkoPOhwxRlLanSFxiBeLlnPFtloCT8C8av4osLbgu1r7bHkf4F67vuHmDD0y4PMNMhqRWHJNyRkR5nlPNvdxbFT_W7HZzHuJs8ewCPXjC4Z_vfEtPX5Qs05L5llhReJAegEm9UfNwEDqIgnaybRMuNJP58Bz8x2bnTxD_2TIeJXYvDmKPpopcYEyaTC0zCn_-jl0avbOtcSz-rJDWtYNPBNgYkNMaxnJIIWtZ-iYJ8ct4_5bcG93l5RqdlFSsaxZM4EI9h_Wgg';

        const authRequest: HttpRequest<any> = request.clone({
            setHeaders: {
                Authorization: `Bearer ${authToken}`
            }
        });

        return next.handle(authRequest);
    }
}
