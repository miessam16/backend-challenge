import { Recipient } from '../dtos/recipient';

export interface StrategyInterface {
    send(recipient: Recipient, message: string): Promise<boolean>;
}
