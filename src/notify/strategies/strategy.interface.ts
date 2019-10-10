import {Recipient} from "../dtos/recipient";
import {Observable} from "rxjs";

export interface StrategyInterface {
    send(recipient: Recipient, message: string): Promise<boolean>;
}
