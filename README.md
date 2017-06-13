TODO APP ;-
React app to manage Todos. Also, explained properly.


Todo List :-
1. Update and delete a TODO.
2. *Writing Test Cases*
3. transformation to react-native
4. *Progressive Web App* 
5. Redux State Implementation
6. Implement a folder structure
[http://cloudinary.com/blog/getting_a_better_react_ion_with_progressive_web_apps?utm_source=reactnl&utm_medium=email]

Folder Structure -
- src
-- api.js   // You'll probably need to make calls to a backend API at some point.Put all that code here.
-- components   // All your presentation(dumb)components go here. These are the simple stateless one that just takes props.
-- containers   // The container components go here. These are the stateful ones, and the ones that makes the API calls. If you're using Redux, these are the ones that are connected to the store. Notice that css and tests are in the same folder as thier respective component.
-- images   // Put the images in one place to start with
-- index.js   // This is where you initialize app and call ReactDOM.render, so it makes sense to keep this at the top level.
-- utils   //  You'll probably end up with miscellaneous utility fns - error handlers,formatters and life. I usally put  them in a file inside utils to access them easily.
[https://daveceddia.com/react-project-structure/?utm_source=reactnl&utm_medium=email]