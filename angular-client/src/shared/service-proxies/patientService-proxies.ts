import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

import { DateTime, Duration } from 'luxon';
import { API_BASE_URL, ApiException } from './service-proxies';

@Injectable()
export class PatientServiceProxy {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    this.http = http;
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : '';
  }

  getPatients(): Observable<ListResultDtoOfPatientDto> {
    let url_ = this.baseUrl + '/api/services/app/Patient/GetPatients';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'text/plain',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetPatients(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetPatients(<any>response_);
            } catch (e) {
              return <Observable<ListResultDtoOfPatientDto>>(<any>_observableThrow(e));
            }
          } else return <Observable<ListResultDtoOfPatientDto>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processGetPatients(response: HttpResponseBase): Observable<ListResultDtoOfPatientDto> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let result200: any = null;
          let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ListResultDtoOfPatientDto.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return throwException('An unexpected server error occurred.', status, _responseText, _headers);
        })
      );
    }
    return _observableOf<ListResultDtoOfPatientDto>(<any>null);
  }

  createPatient(body: any | undefined): Observable<void> {
    let url_ = this.baseUrl + '/api/services/app/Patient/CreatePatient';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
        body: content_,
        observe: "response",
        responseType: "blob",
        headers: new HttpHeaders({
            "Content-Type": "application/json",
        })
    };

    return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
        return this.processPost(response_);
    })).pipe(_observableCatch((response_: any) => {
        if (response_ instanceof HttpResponseBase) {
            try {
                return this.processPost(<any>response_);
            } catch (e) {
                return <Observable<void>><any>_observableThrow(e);
            }
        } else
            return <Observable<void>><any>_observableThrow(response_);
    }));
}

protected processPost(response: HttpResponseBase): Observable<void> {
    const status = response.status;
    const responseBlob =
        response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200 || status===201) {
        return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return _observableOf<void>(<any>null);
        }));
    } else if (status !== 200 && status !== 204) {
        return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }));
    }
    return _observableOf<void>(<any>null);
}
}



export class ListResultDtoOfPatientDto implements IListResultDtoOfPatientDto {
  items!: PatientListDto[] | undefined;

  constructor(data?: IListResultDtoOfPatientDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      if (Array.isArray(_data['items'])) {
        this.items = [] as any;
        for (let item of _data['items']) this.items!.push(PatientListDto.fromJS(item));
      }
    }
  }

  static fromJS(data: any): ListResultDtoOfPatientDto {
    data = typeof data === 'object' ? data : {};
    let result = new ListResultDtoOfPatientDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data['items'] = [];
      for (let item of this.items) data['items'].push(item.toJSON());
    }
    return data;
  }
}
export interface IListResultDtoOfPatientDto {
  items: PatientListDto[] | undefined;
}

export class PatientListDto implements IPatientListDto {
  patientID: string | undefined;
  patientName: string | undefined;
  gender: string | undefined;
  resourceId: string | undefined;
  isCurrent: boolean;
  birthDate: Date | undefined;
  change: number | undefined;
  id: number;

  constructor(data?: IPatientListDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.patientID = _data['patientID'];
      this.patientName = _data['patientName'];
      this.resourceId = _data['resourceId'];
      this.gender = _data['gender'];
      this.isCurrent = _data['isCurrent'];
      this.birthDate = _data['birthDate'];
      this.change = _data['change'];
      this.id = _data['id'];
    }
  }

  static fromJS(data: any): PatientListDto {
    data = typeof data === 'object' ? data : {};
    let result = new PatientListDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['patientID'] = this.patientID;
    data['birthDate'] = this.birthDate ? this.birthDate.toString() : <any>undefined;
    data['patientName'] = this.patientName;
    data['resourceId'] = this.resourceId;
    data['gender'] = this.gender;
    data['isCurrent'] = this.isCurrent;
    data['isCurrent'] = this.isCurrent;
    data['change'] = this.change;
    return data;
  }
}

export interface IPatientListDto {
  patientID: string | undefined;
  patientName: string | undefined;
  gender: string | undefined;
  isCurrent: boolean;
  birthDate: Date | undefined;
  change: number | undefined;
  resourceId: string | undefined;
  id: number;
}
function throwException(
  message: string,
  status: number,
  response: string,
  headers: { [key: string]: any },
  result?: any
): Observable<any> {
  if (result !== null && result !== undefined) return _observableThrow(result);
  else return _observableThrow(new ApiException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
  return new Observable<string>((observer: any) => {
    if (!blob) {
      observer.next('');
      observer.complete();
    } else {
      let reader = new FileReader();
      reader.onload = (event) => {
        observer.next((<any>event.target).result);
        observer.complete();
      };
      reader.readAsText(blob);
    }
  });
}
