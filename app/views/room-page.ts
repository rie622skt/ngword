import { EventData, Page } from '@nativescript/core';
import { RoomViewModel } from '../viewmodels/room-view-model';

export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;
    page.bindingContext = new RoomViewModel();
}