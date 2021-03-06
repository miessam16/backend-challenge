import { of } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { Recipient } from '../../dtos/recipient';
import { StrategyInterface } from '../strategy.interface';

@Injectable()
export class MockPushNotificationStrategy implements StrategyInterface {
    send(recipient: Recipient, message: string): Promise<boolean> {
        return of(Math.random() >= 0.5).toPromise();
    }
}
