# NodeJS mentoring program

## Prerequisites
* node - ^12.18.3
* yarn - ^1.21.1

# Taks 1

* `yarn start:1.1` - task 1.1
* `yarn start:1.2:ram` - task 1.2 with read file to RAM
* `yarn start:1.2:stream` - task 1.2 with read file using streams

## Additional Notes
`stream.ts` has two variations of implemetation. One with `scvParser.subscribe` and another one with custom transformation. For now it is implemented with just commenting of the second option, but in future I want to deal with conditional streams.

# Task 2
The goal of the task is to implement service to get/create/update/delete users.
To run the app use the following command
* `yarn`
* `yarn start:api`

Implemented items
* Implemented service for get/create/update/delete
* Implemented validation for incoming data

## API:
API described in Swagger. To access it follow the steps:
* Clone the project
* Run `yarn` to install all dependencies
* Run `yarn start:api`
* Open your browser and go to `http://localhost:8080/api-docs`