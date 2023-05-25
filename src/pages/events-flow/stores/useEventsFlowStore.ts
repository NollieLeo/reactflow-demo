import { observable } from 'mobx';

class EventsFlowStore {
    @observable
    public innerWidth: number | null = null;

    @observable
    public innerHeight: number | null = null;
}


export const eventsFlowStore = new EventsFlowStore()

