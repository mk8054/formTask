import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AppService {
  private tokenUrl: string = 'http://entityserver.manikworks.com/apptoken';
  private dataUrl: string = 'http://entityserver.manikworks.com/entitymgr';
  constructor(private http: HttpClient) {}

  private getHeaders(): Promise<HttpHeaders> {
    return new Promise((resolve, reject) => {
      let header = new HttpHeaders({
        'LGContext':'ERRORLOG',
        'Context':'PRACTICE',
        'EntityActionType':'GET.FORM.DATA',
      });
      this.http.get(this.tokenUrl).subscribe(
        (res: any) => {
          header = header.append(
            'Authorization',
            `Bearer ${res.ManikJSon[0].JSon0}`
          );

          resolve(header);
        },
        (err) => {
          console.error('Something Went Wrong', err);
        }
      );
    });
  }

  public getData() {
    return new Promise(async (resolve, reject) => {
      const headers: HttpHeaders = await this.getHeaders();
      this.http.get(this.dataUrl, { headers }).subscribe(
        (res:any) => resolve(res.ManikJSon[0]),
        (err) => reject(err)
      );
    });
  }
}
