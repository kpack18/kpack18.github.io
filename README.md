# Path_Visualizer
CSE 442 Path Algorithm Visualizer

Welcome to our Path Finding Algorithm Visualizer!

Please draw in the grid to create a maze of walls for the program to search through.
The visualizer will search starting from the top left tile (0,0) until it finds the bottom right tile (7,7).

To Run just open index.html in your favorite browser (Preferably Chrome) or go to kpack18.github.io for our latest release

Customizable Options:

1.) You can resize the grid using the grid width and height options (entering a valid positive integer) and hitting apply
2.) You can define custom colors with their own weights using the color picker and palette.
  - By default white and black are defined as weights 1 and 0 respectively. (A weight of 0 means a wall and cannot be traversed).
  - Entering a number 0-9 into the box to the left of the color you selected and hitting the plus button will add a new color to the palette with
    the weight you have defined. ( A Weight of 2 for example will take twice as long to traverse as a weight of 1. )
  - Clicking on any of the bubbles next to the color entry space will set your color to the one you selected with the weight shown.
  - Note: Using a undefined color will treat it as weight 1 so make sure you hit that plus button first.
3.) You can Save the current grid set up using the save button, automatically downloading it to your computer.
  - you can then reload the file with the load button if you wish to come back later.

4.) Using the Drop down menu at the bottom you can select between 3 algorithm's
  - Breadth First search
  - Depth First Search (Not guaranteed to find the shortest path)
  - Djikstra's algorithm

  -Hit the Algorithm Button to run your algorithm on the current grid set up.

5.) Testing Purposes
  - If your a developer you may hit the T key to bring up the debug menu.
  - Clicking on any of the buttons will run a series of tests with the output being logged in your browsers developer tools console
  - Make sure you wait for the set of tests to finish before clicking another or else they might conflict.
  - Make sure your grid is clear before running them
