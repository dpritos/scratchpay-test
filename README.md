# scratchpay-test

## how to setup and run

To install this service:

1. Clone repository: `https://github.com/dpritos/scratchpay-test.git`.
2. Copy `.env.example` to `.env`, and update the values accordingly.
3. Make sure you have docker running on your machine
4. Run this command: `docker-compose up`
5. Server will be available on `http://localhost:8080`

## Assumptions

- No input validation required which means availability filter should be a valid `HH:mm` format
- No pagination
- Availability searches are exact match on from and to for simplicity
