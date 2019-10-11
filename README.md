## Description
A notifications microservice which responsible for sending notifications to different clients using different methods (SMS, Push Notifications) based on [NestJS](https://docs.nestjs.com/)

## Archeticture
- The service accept new notifications using its endpoint `POST /api/v1/notifications` 
```json
{
  "messageCode": "COUPON_25",
  "method": "SMS",
  "recipients": [
    {
      "device": "XXXXXXXXX",
      "preferredLanguage": "en",
      "messageParameters": {
        "code": "XXXXXX"
      }
    }
  ]
}
```
- The `device` proberty can be used to pass phone number or mobile device token depends on the method you are using, moreover you can add more recipients.
- Message codes can be found on `/i18n` directory
> Messages can have parameters and this is the usage for `messageParameters` example:
`Save 25% on your next ride using this promo code: {code}`
- The service then enqueue your notifications into a mongo collection.
- Every minute a job for every method (SMS, Push Notifications) is being run and start sending notifications to their providers
> Each provider has a limit per minute which can be found on the environment varriable check `docker-compose.yml`.
- Then if the job is succeeded it sets the notification status to `SUCCEEDED`, if not it sets the status to `FAILED` and increment the `tries`
> tries is a proberty which helps the service to retry sending the failed messages number of tries is limited by the environment varriable `MAXIMUM_TRIES`

## Technologies
- [Docker](https://www.docker.com/)
- [MongoDB:v3.4](https://www.mongodb.com/)
- [NodeJS:v11](https://nodejs.org/en/)
- [NestJS:v6](https://docs.nestjs.com/)
- [Swagger](https://swagger.io/)

## Installation
- Run `docker-compose up`

## API Documentation
- visit `http://localhost:3000/docs`

## For Testing
- Run `npm run test`
> Testing is being run during installation proccess
