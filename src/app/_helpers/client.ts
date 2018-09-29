import { Injectable } from '@angular/core';
// import { Observable, Subject } from 'rxjs';
// import * as Rx from 'rxjs/Rx';
import { WebSocketSubject, webSocket } from 'rxjs/websocket';
import { environment } from '../../environments/environment';

@Injectable()
export class WebSocketService {
  public socket: WebSocketSubject<String>;
  
  constructor() {
    this.socket = new WebSocket(environment.apiUrl);
  }

  public send = (message: String) => {
    this.socket.next(JSON.stringify({'commend': 'pic'}));
  }
}