import { connect } from "./actions/connect";
import { openCash } from "./actions/open-cash";
import { search } from "./actions/search";

export class StarCashClient {
    command: string;
    constructor(command: string) {
        this.command = command;
    }
    connect = connect;
    openCash = openCash;
    search = search;
}