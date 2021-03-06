# pi
This is web-app that allows you to approximate Pi with a numerical simulation. Click "Go" to start adding random points to the square canvas. A fraction of these points will lie inside the circle inscribed in the square. Since these points are sampled from a uniform distribution, the probability of a point being inside the circle if the ratio of the area of the circle and the square, which is `pi / 4`. Hence, when a new point is added we can calculate the fraction of points in the circle and use this as an approximation for the probability. Hence `pi ~ 4 * number of points in the circle / total points`. Below is a wikipedia animation showing the process:

![image](https://user-images.githubusercontent.com/53578447/161393412-300883a7-258d-4d8a-b249-3b2d8e5a049b.png)

When enough simulations are finished for your simulation, click "Stop" to stop them and read off the final approximation value. You can restart the simulations by re-clicking "Go". Refresh the page to restart the simulations from scratch.

Here is an example below:

![image](https://user-images.githubusercontent.com/53578447/161393918-6e04011b-8074-4b48-a4f2-934e18435a75.png)

To run locally:
1. Install javascript (node)
2. Install the `http-server` package using the command `npm install http-server -g`
3. Run the command `http-server` in the project directory and go to http://localhost:8080
4. Enjoy!
