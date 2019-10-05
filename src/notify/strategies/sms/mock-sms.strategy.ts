import {Recipient} from "../../dtos/recipient";
import {Observable, of} from "rxjs";
import {Injectable} from "@nestjs/common";
import {StrategyInterface} from "../strategy.interface";

@Injectable()
export class MockSmsStrategy implements StrategyInterface {
    send(recipient: Recipient, message: string): Observable<boolean> {
        return of(Math.random() >= 0.5);
    }
}