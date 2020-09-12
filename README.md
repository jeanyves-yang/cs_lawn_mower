# CS Lawn Mower 

This is a typescript based repository, simulating lawn mowers moving on a rectangular surface. 

## Dependencies
- typescript (used: 4.0.2)
- node (used: 12.16.0)

## How to run
- Edit the configuration file (...) to indicate the path to the input commands text file. 
- Run typescript to generate corresponding js files:
```
tsc main.ts
```

- Run the javascript files: 
```
node main.js
```

## How to test


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
- 






## Author
Jean-Yves Yang