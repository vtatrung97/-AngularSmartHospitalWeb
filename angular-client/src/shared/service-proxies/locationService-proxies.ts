import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

import { DateTime, Duration } from 'luxon';
import { API_BASE_URL, ApiException } from './service-proxies';

@Injectable()
export class LocationServiceProxy {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    this.http = http;
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : '';
  }

  getLocations(): Observable<ListResultDtoOfLocationDto> {
    let url_ = this.baseUrl + '/api/services/app/Location/GetLocations';
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
          return this.processGetLocations(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetLocations(<any>response_);
            } catch (e) {
              return <Observable<ListResultDtoOfLocationDto>>(<any>_observableThrow(e));
            }
          } else return <Observable<ListResultDtoOfLocationDto>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processGetLocations(response: HttpResponseBase): Observable<ListResultDtoOfLocationDto> {
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
          result200 = ListResultDtoOfLocationDto.fromJS(resultData200);
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
    return _observableOf<ListResultDtoOfLocationDto>(<any>null);
  }

  createLocation(body: any | undefined): Observable<void> {
    let url_ = this.baseUrl + '/api/services/app/Location/CreateLocation';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processPost(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processPost(<any>response_);
            } catch (e) {
              return <Observable<void>>(<any>_observableThrow(e));
            }
          } else return <Observable<void>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processPost(response: HttpResponseBase): Observable<void> {
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
    if (status === 200 || status === 201) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return _observableOf<void>(<any>null);
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return throwException('An unexpected server error occurred.', status, _responseText, _headers);
        })
      );
    }
    return _observableOf<void>(<any>null);
  }
}

export class ListResultDtoOfLocationDto implements IListResultDtoOfLocationDto {
  items!: LocationDto[] | undefined;

  constructor(data?: IListResultDtoOfLocationDto) {
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
        for (let item of _data['items']) this.items!.push(LocationDto.fromJS(item));
      }
    }
  }

  static fromJS(data: any): ListResultDtoOfLocationDto {
    data = typeof data === 'object' ? data : {};
    let result = new ListResultDtoOfLocationDto();
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
export interface IListResultDtoOfLocationDto {
  items: LocationDto[] | undefined;
}

export class LocationDto implements ILocationDto {
  status: string | undefined;
  name: string | undefined;
  description: string | undefined;
  mode: string | undefined;
  physicalType: string | undefined;
  isCurrent: boolean;
  path: string | undefined;
  change: number | undefined;
  jsonResource: string | undefined;
  partOf: number;
  id: number;

  constructor(data?: ILocationDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.status = _data['status'];
      this.name = _data['name'];
      this.description = _data['description'];
      this.mode = _data['mode'];
      this.physicalType = _data['physicalType'];
      this.isCurrent = _data['isCurrent'];
      this.path = _data['path'];
      this.change = _data['change'];
      this.jsonResource = _data['jsonResource'];
      this.partOf = _data['partOf'];
      this.id = _data['id'];
    }
  }

  static fromJS(data: any): LocationDto {
    data = typeof data === 'object' ? data : {};
    let result = new LocationDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['status'] = this.status;
    data['name'] = this.name;
    data['description'] = this.description;
    data['mode'] = this.mode;
    data['physicalType'] = this.physicalType;
    data['isCurrent'] = this.isCurrent;
    data['path'] = this.path;
    data['change'] = this.change;
    data['jsonResource'] = this.jsonResource;
    data['partOf'] = this.partOf;
    data['id'] = this.id;
    return data;
  }
}

export interface ILocationDto {
  status: string | undefined;
  name: string | undefined;
  description: string | undefined;
  mode: string | undefined;
  physicalType: string | undefined;
  isCurrent: boolean;
  path: string | undefined;
  change: number | undefined;
  jsonResource: string | undefined;
  partOf: number;
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
