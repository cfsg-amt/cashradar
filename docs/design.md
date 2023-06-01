# Design

1. **Use of React**: We have decided to use React for building the Radar page due to its advantages in creating interactive UIs, managing component-based architecture, and efficient rendering.
2. **State Management:** We plan to use React's built-in state management (useState and useContext) to manage the shared state between different components.
3. **Chart Library:** We have chosen the [Victory](https://github.com/FormidableLabs/victory) library to create the radar scatter plot due to its flexibility, good support for interactivity, and its integration with React.
4. **Data Management:** We decided to reduce the complexity of the front-end by storing as little data as possible. We will only maintain a columnar storage for chart data, which would be filled by the data sent by the backend. The backend is responsible for maintaining the consistency of the data order.
5. **Columnar Storage:** We will store each header's values in arrays, ensuring that the data for each stock is aligned across all arrays. This format suits our use case where we only access a single attribute across all stocks, and it allows efficient updates.
6. **API Requests:** For fetching data, we plan to make API requests to the backend whenever a user selects a new header that we haven't retrieved before. This ensures we only fetch data as needed, and reduces the amount of data stored in the front-end.
7. **Backend Data Order**: In order to maintain consistency, we will use sorting on the backend to ensure the order of data. We will use an indexed field in MongoDB for this purpose.
8. **Future Considerations**: While building the application, we need to consider the potential future growth of the application, ensuring scalability and maintainability of the code.


## Components
* **Filter Component:** This component, placed above the scatter plot, allows users to choose the region of the stock, stock type, and search for stocks by name.

* **Scatter Plot Component:** This component is responsible for displaying the radar-style scatter plot.

* **Data Display Component:** Positioned below the scatter plot, it shows all attributes of the stock the user is seeking or has selected within the scatter plot.

### Filter

### Scatter Plot

I contend that one of our greatest advantages in having a backend **is its capacity to reduce the states (including data) that need to be stored on the front end.**
This not only simplifies the front end but also decreases the likelihood of unforeseen errors. The front end tends to rely on numerous layers of abstraction, making debugging somewhat unpredictable at times. Hence, we should aim to minimize data storage on the front end as much as possible.

Most libraries typically represent the scatter plot as a rectangle and often lack the flexibility to customize its shape, such as into a circle, or control the background color of the plot. However, while designing the radar chart, I have ingeniously situated the scatter plot within a black SVG circle, ensuring the axes and the circle are inscribed. To accomplish this, the diameter of the circle always corresponds to the shortest side (either length or width) when drawing the chart. This implies that the length of the scatter plot's square side should be calculated as 'cos45 * width'.


### Data Display

## Specifications
The project calls for an index page, the pivotal function of the Radar Project. This index page will include a substantial radar-style scatter plot, offering the user the capability to dictate the x-y axes of this plot.

Positioned above the scatter plot, there should be a data filtering section. Here, users can choose the region of the stock, the stock type, and search stocks by name.

Beneath the scatter plot, there will be a data presentation area, displaying all attributes of the stock the user is seeking or has selected within the scatter plot.

## Challenges
Despite these features, my initial implementation of the radar project presented some challenges:

Data Caching Challenge: Considering the potential for a vast amount of data in the future, we need a mechanism to "remember" all the data fetched from the back-end through API requests. For instance, before changing the x-y axes, we should first verify whether those headers have already been retrieved to determine if another request to the back end is necessary. The conundrum lies in how to store the data on the front end and in designing the data structure.

Custom Radar Plot: The radar plot has specific requirements. We need a scatter plot resembling a "radar," with a black background and green circles inside, forming a round chart. This requirement is quite bespoke, and in my initial Radar page version, I utilized an SVG graph and D3.js to construct the plot within this graph, and Svelte to handle the data source and state. However, this was a rather cumbersome coding/debugging experience since state sharing is critical in Svelte. Therefore, we need to explore alternatives to create this plot.
