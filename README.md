# CS Lawn Mower 

This is a typescript based repository, simulating lawn mowers moving on a rectangular surface. 

## Dependencies
(Refer to package-lock.json for more details)
- typescript (used: 4.0.2)
- node (used: 12.16.0)
- mocha (8.0.3) + chai (4.2.12) for testing
- nyc (15.1.0) for coverage

## How to run
- In general, you can refer to scripts in package.json
- For more details, see below.

- Edit the configuration file config.json to indicate the path to the input commands text file. By default it is set to inputCommands.txt. You can also indicate the output file path (it will contain the final position and orientation of each lawn mower).

- Run directly the index.ts with ts-node: 
```
npm run start-dev
```

- Output is written in the file as specified in the config.json

- (Optionally, if this was packaged) Run build to generate corresponding js files:
```
npm run build
```

- Then run it:
```
npm run start
```

## How to test
Run the following in order to run all tests:
```
npm run test
```

You can also check lint errors and format using:
```
npm run lint
npm run format
```

You can also check test coverage using (it also runs test):
```
npm run coverage
```
It produces a folder coverage containing all the details, as well as giving an output in the command line as follow: 
=============================== Coverage summary ===============================
Statements   : 96.57% ( 197/204 )
Branches     : 89.29% ( 50/56 )
Functions    : 93.94% ( 31/33 )
Lines        : 97.45% ( 191/196 )

## Requirements
- A lawn mower is defined by two coordinates (x,y) and a direction (letter: N, E, S or W)
- The lawn is defined by a rectangular grid, bottom left corner is at (0,0), top right corner is given in the input file
- Mower can receive a command designed by a letter: L, R or F
    - Command L or R make the mower rotate by 90 degrees, left or right respectively
    - Command F make the mower move in front of its direction by one cell if the lawn dimensions allow it
- After a mower finishes to perform its sequence of commands, it outputs its coordinates and direction.
- Going North/South increments (resp. decrements) coordinate Y on the grid, going East/West increments (resp. decrements) coordinate X on the grid. 

- Takes a text file as input
    - First line of the text file indicates upper right corner coordinates of the lawn / rectangular grid.
    - Then lines are paired by 2 for each mower: 
        - one with a lawn mower position (2 numbers for the coordinates, one letter for the orientation) separated by a space
        - the second with a sequence of letter without space giving commands to the lawn mower.

## Notes
- Several lawn mowers can be at the same position. 
- Uses prettier for formatting, tslint as linter, nyc as coverage, mocha/chai + chai-as-expected as test framework.
- Should replace the console log calls in index.ts by a proper logger, would also avoid the remaining lint errors.
 
## Author
Jean-Yves Yang
