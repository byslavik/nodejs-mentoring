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
* `yarn start:2`

Implemented items
* Implemented service for get/create/update/delete
* Implemented validation for incoming data

## API:
* Route `/user/`
    * `POST`  
        Payload:  
        ```
            {
                login: String w/o spaces. Required.
                password: String that contains letters and numbers. Required.
                age: Number. Integer. Min value is 4. Max value is 130. Required.
            }
        ```  
        Output:  
        ```
            {
                id: String
                login: String
                password: String
                age: Number
                isDeleted: Boolean
            }
        ```
* Route `/user/:id`
    * `GET`  
        Output:  
        ```
            {
                id: String
                login: String
                password: String
                age: Number
                isDeleted: Boolean
            }
        ```
    * `PATCH`  
        Payload:  
        ```
            {
                login: String w/o spaces.
                password: String that contains letters and numbers.
                age: Number. Integer. Min value is 4. Max value is 130.
            }
        ```  
        Output:  
        ```
            {
                id: String
                login: String
                password: String
                age: Number
                isDeleted: Boolean
            }
        ```
    * `DELETE`
        Output: 200 OK
* Route `/user/search` 
    * `POST`  
        Payload:  
        ```
            {
                query: String w/o spaces. Required
                limit: Number. Integer. Min 0. Max 100. Required
            }
        ``` 
        Output:  
        ```
            [
                {
                    id: String
                    login: String
                    password: String
                    age: Number
                    isDeleted: Boolean
                },
            ...
            ]
        ```
        