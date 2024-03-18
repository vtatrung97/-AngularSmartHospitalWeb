import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

import { DateTime, Duration } from 'luxon';
import { API_BASE_URL, ApiException } from './service-proxies';

@Injectable()
export class StructureDefinitionServiceProxy {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    this.http = http;
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : '';
  }

  getStructureDefinitions(): Observable<ListResultDtoOfStructureDefinitionDto> {
    let url_ = this.baseUrl + '/api/services/app/StructureDefinition/GetAll';
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
          return this.processGetStructureDefinitions(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetStructureDefinitions(<any>response_);
            } catch (e) {
              return <Observable<ListResultDtoOfStructureDefinitionDto>>(<any>_observableThrow(e));
            }
          } else return <Observable<ListResultDtoOfStructureDefinitionDto>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processGetStructureDefinitions(response: HttpResponseBase): Observable<ListResultDtoOfStructureDefinitionDto> {
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
          result200 = ListResultDtoOfStructureDefinitionDto.fromJS(resultData200);
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
    return _observableOf<ListResultDtoOfStructureDefinitionDto>(<any>null);
  }

  getByType(type:string): Observable<StructureDefinitionDto> {
    let url_ = this.baseUrl + '/api/services/app/StructureDefinition/GetByType?type='+type;
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
          return this.processGetStructureDefinition(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetStructureDefinition(<any>response_);
            } catch (e) {
              return <Observable<StructureDefinitionDto>>(<any>_observableThrow(e));
            }
          } else return <Observable<StructureDefinitionDto>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processGetStructureDefinition(response: HttpResponseBase): Observable<StructureDefinitionDto> {
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
          result200 = StructureDefinitionDto.fromJS(resultData200);
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
    return _observableOf<StructureDefinitionDto>(<any>null);
  }

  createStructureDefinition(body: any | undefined): Observable<void> {
    let url_ = this.baseUrl + '/api/services/app/StructureDefinition/Create';
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

  updateStructureDefinition(id:number, body: any | undefined): Observable<void> {
    let url_ = this.baseUrl + '/api/services/app/StructureDefinition/Update?Id='+id;
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
    let url_ = this.baseUrl + "/api/services/app/StructureDefinition/Delete?";
    if (id === null)
        throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
        url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: any = {
        observe: "response",
        responseType: "blob",
        headers: new HttpHeaders({
        })
    };

    return this.http.request("delete", url_, options_).pipe(_observableMergeMap((response_: any) => {
        return this.processDelete(response_);
    })).pipe(_observableCatch((response_: any) => {
        if (response_ instanceof HttpResponseBase) {
            try {
                return this.processDelete(<any>response_);
            } catch (e) {
                return <Observable<void>><any>_observableThrow(e);
            }
        } else
            return <Observable<void>><any>_observableThrow(response_);
    }));
}

protected processDelete(response: HttpResponseBase): Observable<void> {
    const status = response.status;
    const responseBlob =
        response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
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

export class ListResultDtoOfStructureDefinitionDto implements IListResultDtoOfStructureDefinitionDto {
  items!: StructureDefinitionDto[] | undefined;

  constructor(data?: IListResultDtoOfStructureDefinitionDto) {
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
        for (let item of _data['items']) this.items!.push(StructureDefinitionDto.fromJS(item));
      }
    }
  }

  static fromJS(data: any): ListResultDtoOfStructureDefinitionDto {
    data = typeof data === 'object' ? data : {};
    let result = new ListResultDtoOfStructureDefinitionDto();
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
export interface IListResultDtoOfStructureDefinitionDto {
  items: StructureDefinitionDto[] | undefined;
}


export class StructureDefinitionDto implements IStructureDefinitionDto {
  name: string | undefined;
  title: string | undefined;
  status: string | undefined;
  path: string | undefined;
  jsonResource: string | undefined;
  isCurrent: boolean;
  change: number | undefined;
  publisher: string | undefined;
  creationTime: DateTime | undefined;
  kind: string | undefined;
  type: string | undefined;
  id: number;

  constructor(data?: IStructureDefinitionDto) {
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
      this.kind = _data['kind'];
      this.type = _data['type'];
      this.id = _data['id'];
    }
  }

  static fromJS(data: any): StructureDefinitionDto {
    data = typeof data === 'object' ? data : {};
    let result = new StructureDefinitionDto();
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
    data['kind'] = this.kind;
    data['type'] = this.type;
    data['id'] = this.id;
    return data;
  }
}

export interface IStructureDefinitionDto {
  name: string | undefined;
  title: string | undefined;
  status: string | undefined;
  path: string | undefined;
  isCurrent: boolean;
  change: number | undefined;
  publisher: string | undefined;
  jsonResource: string | undefined;
  kind: string | undefined;
  type: string | undefined;
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
