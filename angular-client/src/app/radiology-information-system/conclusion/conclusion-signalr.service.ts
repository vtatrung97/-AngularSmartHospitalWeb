import { Injectable, Injector, NgZone } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { HubConnection } from '@microsoft/signalr';

@Injectable()
export class ConclusionSignalrService extends AppComponentBase {

    constructor(
        injector: Injector,
        public _zone: NgZone
    ) {
        super(injector);
    }

    conclusionHub: HubConnection;
    isConclusionConnected = false;
    _connenction: any;

    get connection(): any {
        return this._connenction;
    }

    set connection(value: any) {
        this._connenction = value;
    }

    configureConnection(connection): void {
        // Set the common hub
        this.conclusionHub = connection;

        // Reconnect loop
        let reconnectTime = 5000;
        let tries = 1;
        let maxTries = 8;
        function start() {
            return new Promise(function (resolve, reject) {
                if (tries > maxTries) {
                    reject();
                } else {
                    connection.start()
                        .then(resolve)
                        .then(() => {
                            reconnectTime = 5000;
                            tries = 1;
                        })
                        .catch(() => {
                            setTimeout(() => {
                                start().then(resolve);
                            }, reconnectTime);
                            reconnectTime *= 2;
                            tries += 1;
                        });
                }
            });
        }

        // Reconnect if hub disconnects
        connection.onclose(e => {
            this.isConclusionConnected = false;

            if (e) {
                abp.log.debug('Chat connection closed with error: ' + e);
            } else {
                abp.log.debug('Chat disconnected');
            }

            start().then((value: any) => {
                this.isConclusionConnected = true;
            });
        });

        // Register to get notifications
        this.registerConclusionEvents(connection);
    }
    registerConclusionEvents(connection): void {
        connection.on('receiveMessage', message => {
            abp.event.trigger('app.conclusion.messageReceived', message);
        });
    }

    sendImage(imageData, connectionId, callback): void {
        if (!this.isConclusionConnected) {
            if (callback) {
                callback();
            }

            abp.notify.warn(this.l('ConclusionIsNotConnectedWarning'));
            return;
        }
        this.conclusionHub.invoke('sendImage', imageData,connectionId).then(result => {
            if (result) {
                abp.notify.warn(result);
            }

            if (callback) {
                callback();
            }
        }).catch(error => {
            abp.log.error(error);

            if (callback) {
                callback();
            }
        });
    }
    init(): void {
        this._zone.runOutsideAngular(() => {
            abp.signalr.connect();
            abp.signalr.startConnection(abp.appPath + 'conclusion-realtime', connection => {
                this.configureConnection(connection);
            }).then((value) => {
                this._connenction = value.connection;
                abp.event.trigger('app.conclusion.connected');
                this.isConclusionConnected = true;
            });
        });
    }
}
