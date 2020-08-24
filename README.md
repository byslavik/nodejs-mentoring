# NodeJS mentoring program

## Prerequisites
* node - ^12.18.3
* yarn - ^1.21.1

* `yarn start:1.1` - task 1.1
* `yarn start:1.2:ram` - task 1.2 with read file to RAM
* `yarn start:1.2:stream` - task 1.2 with read file using streams

## Additional Notes
`stream.ts` has two variations of implemetation. One with `scvParser.subscribe` and another one with custom transformation. For now it is implemented with just commenting of the second option, but in future I want to deal with conditional streams.