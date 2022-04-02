# pi
This is web-app that allows you to approximate Pi with a numerical simulation. Click "go" to start adding random points to the square canvas. A fraction of these points will lie inside the circle inscribed in the square. Since these points are sampled from a uniform distribution, the probability of a point being inside the circle if the ratio of the area of the circle and the square, which is `pi / 4`. Hence, when a new point is added we can calculate the fraction of points in the circle and use this as an approximation for the probability. Hence `pi ~ 4 * number of points in the circle / total points`. Below is a wikipedia animation showing the process:

![image](https://user-images.githubusercontent.com/53578447/161393412-300883a7-258d-4d8a-b249-3b2d8e5a049b.png)

When enough simulations are finished for your simulation, click "stop" to stop them and read off the final approximation value. You can restart the simulations by re-clicking "Go". Refresh the page to restart the simulations from scratch.
