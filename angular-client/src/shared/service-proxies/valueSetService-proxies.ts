import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

import { DateTime, Duration } from 'luxon';
import { API_BASE_URL, ApiException } from './service-proxies';

@Injectable()
export class ValueSetServiceProxy {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    this.http = http;
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : '';
  }

  getValueSets(): Observable<ListResultDtoOfValueSetDto> {
    let url_ = this.baseUrl + '/api/services/app/ValueSet/GetAll';
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
          return this.processGetValueSets(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetValueSets(<any>response_);
            } catch (e) {
              return <Observable<ListResultDtoOfValueSetDto>>(<any>_observableThrow(e));
            }
          } else return <Observable<ListResultDtoOfValueSetDto>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processGetValueSets(response: HttpResponseBase): Observable<ListResultDtoOfValueSetDto> {
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
          result200 = ListResultDtoOfValueSetDto.fromJS(resultData200);
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
    return _observableOf<ListResultDtoOfValueSetDto>(<any>null);
  }

  getValueSetByPath(path: string): Observable<ValueSetDto> {
    let url_ = this.baseUrl + '/api/services/app/ValueSet/GetByPath';
    if (path === null) throw new Error("The parameter 'path' cannot be null.");
    else if (path !== undefined) url_ += '?path=' + encodeURIComponent('' + path) + '&';
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
          return this.processGetValueSet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetValueSet(<any>response_);
            } catch (e) {
              return <Observable<ValueSetDto>>(<any>_observableThrow(e));
            }
          } else return <Observable<ValueSetDto>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processGetValueSet(response: HttpResponseBase): Observable<ValueSetDto> {
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
          result200 = ValueSetDto.fromJS(resultData200);
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
    return _observableOf<ValueSetDto>(<any>null);
  }

  createValueSet(body: any | undefined): Observable<void> {
    let url_ = this.baseUrl + '/api/services/app/ValueSet/Create';
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

  update(id: number, body: any | undefined): Observable<void> {
    let url_ = this.baseUrl + '/api/services/app/ValueSet/Update?Id=' + id;
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
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUpdate(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUpdate(<any>response_);
            } catch (e) {
              return <Observable<void>>(<any>_observableThrow(e));
            }
          } else return <Observable<void>>(<any>_observableThrow(response_));
        })
      );
  }

  updateValueSet(body: any | undefined): Observable<any> {
    let url_ = this.baseUrl + '/api/services/app/ValueSet/updateValueSet';
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
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUpdateValueSet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUpdateValueSet(<any>response_);
            } catch (e) {
              return <Observable<void>>(<any>_observableThrow(e));
            }
          } else return <Observable<void>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processUpdateValueSet(response: HttpResponseBase): Observable<any> {
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
          // result200 = ValueSetDto.fromJS(resultData200);
          return _observableOf(resultData200);
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

  protected processUpdate(response: HttpResponseBase): Observable<void> {
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

  delete(id: number | undefined): Observable<void> {
    let url_ = this.baseUrl + '/api/services/app/ValueSet/Delete?';
    if (id === null) throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined) url_ += 'Id=' + encodeURIComponent('' + id) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({}),
    };

    return this.http
      .request('delete', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processDelete(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processDelete(<any>response_);
            } catch (e) {
              return <Observable<void>>(<any>_observableThrow(e));
            }
          } else return <Observable<void>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processDelete(response: HttpResponseBase): Observable<void> {
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

export class ListResultDtoOfValueSetDto implements IListResultDtoOfValueSetDto {
  items!: ValueSetListDto[] | undefined;

  constructor(data?: IListResultDtoOfValueSetDto) {
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
        for (let item of _data['items']) this.items!.push(ValueSetListDto.fromJS(item));
      }
    }
  }

  static fromJS(data: any): ListResultDtoOfValueSetDto {
    data = typeof data === 'object' ? data : {};
    let result = new ListResultDtoOfValueSetDto();
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
export interface IListResultDtoOfValueSetDto {
  items: ValueSetListDto[] | undefined;
}

export class ValueSetListDto implements IValueSetListDto {
  name: string | undefined;
  title: string | undefined;
  status: string | undefined;
  path: string | undefined;
  isCurrent: boolean;
  change: number | undefined;
  publisher: string | undefined;
  jsonResource: string | undefined;
  creationTime: DateTime | undefined;
  id: number;

  constructor(data?: IValueSetListDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.name = _data['name'];
      this.creationTime = _data['creationTime'];
      this.title = _data['title'];
      this.status = _data['status'];
      this.path = _data['path'];
      this.isCurrent = _data['isCurrent'];
      this.change = _data['change'];
      this.publisher = _data['publisher'];
      this.jsonResource = _data['jsonResource'];
      this.id = _data['id'];
    }
  }

  static fromJS(data: any): ValueSetListDto {
    data = typeof data === 'object' ? data : {};
    let result = new ValueSetListDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['name'] = this.name;
    data['creationTime'] = this.creationTime ? this.creationTime.toString() : <any>undefined;
    data['title'] = this.title;
    data['status'] = this.status;
    data['path'] = this.path;
    data['isCurrent'] = this.isCurrent;
    data['change'] = this.change;
    data['publisher'] = this.publisher;
    data['jsonResource'] = this.jsonResource;
    data['id'] = this.id;
    return data;
  }
}

export interface IValueSetListDto {
  name: string | undefined;
  title: string | undefined;
  status: string | undefined;
  path: string | undefined;
  isCurrent: boolean;
  change: number | undefined;
  publisher: string | undefined;
  jsonResource: string | undefined;
  creationTime: DateTime | undefined;
  id: number;
}

export class ValueSetDto implements IValueSetDto {
  name: string | undefined;
  title: string | undefined;
  status: string | undefined;
  path: string | undefined;
  jsonResource: string | undefined;
  isCurrent: boolean;
  change: number | undefined;
  publisher: string | undefined;
  creationTime: DateTime | undefined;
  id: number;

  constructor(data?: IValueSetDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.name = _data['name'];
      this.creationTime = _data['creationTime'];
      this.title = _data['title'];
      this.status = _data['status'];
      this.path = _data['path'];
      this.isCurrent = _data['isCurrent'];
      this.change = _data['change'];
      this.jsonResource = _data['jsonResource'];
      this.publisher = _data['publisher'];
      this.id = _data['id'];
    }
  }

  static fromJS(data: any): ValueSetDto {
    data = typeof data === 'object' ? data : {};
    let result = new ValueSetDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['name'] = this.name;
    data['creationTime'] = this.creationTime ? this.creationTime.toString() : <any>undefined;
    data['title'] = this.title;
    data['status'] = this.status;
    data['path'] = this.path;
    data['isCurrent'] = this.isCurrent;
    data['jsonResource'] = this.jsonResource;
    data['change'] = this.change;
    data['publisher'] = this.publisher;
    data['id'] = this.id;
    return data;
  }
}

export interface IValueSetDto {
  name: string | undefined;
  title: string | undefined;
  status: string | undefined;
  path: string | undefined;
  isCurrent: boolean;
  change: number | undefined;
  publisher: string | undefined;
  jsonResource: string | undefined;
  creationTime: DateTime | undefined;
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
