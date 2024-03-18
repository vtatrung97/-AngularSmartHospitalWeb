import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

import { DateTime, Duration } from 'luxon';
import { API_BASE_URL, ApiException } from './service-proxies';

@Injectable()
export class ServiceRequestServiceProxy {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    this.http = http;
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : '';
  }

  getAll(status ?: string |undefined, intent ?: string|undefined, priority ?: string|undefined): Observable<ListResultDtoOfServiceRequestDto> {
    let url_ = this.baseUrl + '/api/services/app/ServiceRequest/GetAll?';
    url_ = url_.replace(/[?&]$/, '');

    if (status !== undefined) url_ += 'status=' + encodeURIComponent('' + status) + '&';
    if (intent !== undefined) url_ += 'intent=' + encodeURIComponent('' + intent) + '&';
    if (priority !== undefined) url_ += 'priority=' + encodeURIComponent('' + priority) + '&';

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
          return this.processGetAll(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAll(<any>response_);
            } catch (e) {
              return <Observable<ListResultDtoOfServiceRequestDto>>(<any>_observableThrow(e));
            }
          } else return <Observable<ListResultDtoOfServiceRequestDto>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processGetAll(response: HttpResponseBase): Observable<ListResultDtoOfServiceRequestDto> {
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
          result200 = ListResultDtoOfServiceRequestDto.fromJS(resultData200);
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
    return _observableOf<ListResultDtoOfServiceRequestDto>(<any>null);
  }

  create(body: any | undefined): Observable<void> {
    let url_ = this.baseUrl + '/api/services/app/ServiceRequest/Create';
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

export class ListResultDtoOfServiceRequestDto implements IListResultDtoOfServiceRequestDto {
  items!: ServiceRequestDto[] | undefined;

  constructor(data?: IListResultDtoOfServiceRequestDto) {
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
        for (let item of _data['items']) this.items!.push(ServiceRequestDto.fromJS(item));
      }
    }
  }

  static fromJS(data: any): ListResultDtoOfServiceRequestDto {
    data = typeof data === 'object' ? data : {};
    let result = new ListResultDtoOfServiceRequestDto();
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
export interface IListResultDtoOfServiceRequestDto {
  items: ServiceRequestDto[] | undefined;
}

export class ServiceRequestDto implements IServiceRequestDto {
  status: string | undefined;
  intent: string | undefined;
  priority: string | undefined;
  code: string | undefined;
  doNotPerform: boolean;
  isCurrent: boolean;
  subject: string | undefined;
  performerType: string | undefined;
  performer: string | undefined;
  locationReference: string | undefined;
  insurance: string | undefined;
  specimen: string | undefined;
  path: string | undefined;
  jsonResource: string | undefined;
  text: string | undefined;
  patient: string | undefined;
  id: number;

  constructor(data?: IServiceRequestDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.status = _data['status'];
      this.intent = _data['intent'];
      this.priority = _data['priority'];
      this.doNotPerform = _data['doNotPerform'];
      this.code = _data['code'];
      this.isCurrent = _data['isCurrent'];
      this.path = _data['path'];
      this.subject = _data['subject'];
      this.jsonResource = _data['jsonResource'];
      this.performerType = _data['performerType'];
      this.performer = _data['performer'];
      this.locationReference = _data['locationReference'];
      this.insurance = _data['insurance'];
      this.specimen = _data['specimen'];
      this.text = _data['text'];
      this.patient = _data['patient'];
      this.id = _data['id'];
    }
  }

  static fromJS(data: any): ServiceRequestDto {
    data = typeof data === 'object' ? data : {};
    let result = new ServiceRequestDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['status'] = this.status;
    data['intent'] = this.intent;
    data['priority'] = this.priority;
    data['doNotPerform'] = this.doNotPerform;
    data['code'] = this.code;
    data['isCurrent'] = this.isCurrent;
    data['path'] = this.path;
    data['subject'] = this.subject;
    data['jsonResource'] = this.jsonResource;
    data['performerType'] = this.performerType;
    data['performer'] = this.performer;
    data['locationReference'] = this.locationReference;
    data['insurance'] = this.insurance;
    data['specimen'] = this.specimen;
    data['text'] = this.text;
    data['patient'] = this.patient;
    data['id'] = this.id;
    return data;
  }
}

export interface IServiceRequestDto {
  status: string | undefined;
  intent: string | undefined;
  priority: string | undefined;
  doNotPerform: boolean;
  isCurrent: boolean;
  code: string | undefined;
  subject: string | undefined;
  performerType: string | undefined;
  performer: string | undefined;
  locationReference: string | undefined;
  insurance: string | undefined;
  specimen: string | undefined;
  path: string | undefined;
  jsonResource: string | undefined;
  text: string | undefined;
  patient: string | undefined;
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
