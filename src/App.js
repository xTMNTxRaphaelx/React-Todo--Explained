/**
 * @title - React JS Todo Explained
 * @author Fish
 * @Chill - The Master detaches herself from all things: Therefore she is united with all things.
 * She gives no thought to self. Therefore she is perfectly fulfilled - Lao Tzu
 */

import React, { Component } from "react";
import "./App.css";

class TodoList extends React.Component {
  /*
  This is the component class definition.
  Think of it as the blueprint we use every time we want to display TodoList in the UI.
  React instantiates an object from this class when we use <TodoList ... />.
  This object gets displayed in the browser,  and 
  it's referred to as "this" within the class definition here.
  */

  static propTypes = {
    todos: React.PropTypes.array
  };
  /*
  The proptypes property defines the types of the inputs
  this component expects. The "todos" input,
  which we use as (this.props.todos) is expected 
  to be an array of things.
  If this component receives a "todos" input
  that is not an array, it would give a warning about it
  */

  constructor(props) {
    /*
    * The constructor method gets called first thing
    * when we do <TodoList items=... />.
    * The "props" argument is an object holding all the attributes
    * that we pass to <TodoList ... />: {items: [...]}
    */

    super(props);
    /*
    Since TodoList is a JS class that extends React.Component,
    we have to invoke the super constructor here (using the same arguments)
    to officially make TodoList a React component.
    (If super was not called here, TodoList would just ignore the inheritance)
    */

    this.state = { todos: this.props.todos || [] };
    /*
    This lines initializes the state of the <TodoList ../> element
    (remember : "this"is the element that we have in the DOM 
    which used the TodoList component as the blueprint.)
    The state is a POJO, with a todos property that reads its initial value from the props input
    */
  }

  addTodo = item => {
    this.setState({ todos: this.state.todos.concat([item]) });
  };
  /*
  The addTodo is a component method, it's being passed to the TodoInput element as a callback.
  This method expects an item object, and appends it to the current state.todos array
  that is being managed for the TodoList element..
  The setState is React's way to keep track of the state changes since React needs to "react" to this change.
  React will use Virtual DOM diffing to take the change to the browser. For the render method below,
  this mean React will re-render the TodoItems element everytime we call this addTodo method.
  */

  render() {
    return (
      <div>
        <h3>TODO List</h3>
        <TodoItems items={this.state.todos} />
        <TodoInput addTodo={this.addTodo} />
      </div>
    );
  }
}

class TodoItems extends React.Component {
  static propTypes = {
    items: React.PropTypes.array.isRequired
  };
  /*
  Here, we're specifying that the "items" props input
  is an array and it's also required. We can't render
  a TodoItems element without a value for this input (React will warn if we do).
  */

  constructor(props) {
    super(props);
  }
  /*
  We are not managing any state on the TodoItems element.
  It gets purely rendered based on its props input(this.props.items).
  This component can be simply represented as just a function
  */

  render() {
    const createItem = (item, index) => {
      return <li key={index}>{item}</li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
    /*
    Here, we take the inputted "items" array, map every element there
    to an <li>element with content from the original array,
    then return a <ul> element holding all the mapped <li> elements.
    The key attribute is a React internal thing.
    It helps React identify dynamic children and what to do when they change (they don't change in this example).
    Using index here is a bad pratice, instead, we should give every todo item a unique id and use that id
    for the React key attribute.
    */
  }
}

class TodoInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: "" };
  }
  /*
  TodoInput is known as controlled input component.
  The "item" state is only used to represent the value
  of the text input element.
  This state is not part of the main application state.
   */

  onChange = e => {
    this.setState({ item: e.target.value });
  };
  /*
  Every time a change happens to the value of the text input,
  we sync the new value to the state.item
  */

  handleSubmit = e => {
    e.preventDefault();
    this.props.addTodo(this.state.item);
    /*
    When we hit the submit button, we want to call the callback addTodo with an argument that holds
    the user input value. We use this.state.item for that argument since the state is synced with the text input. 
    With this method, we don't have to use the DOM to read the value, and React is aware of the changes to input.

    The addTodo callback is what <TodoInput /> received when it was initialized by <TodoList /> render method.
    It's a method on TodoList but TodoList gave TodoInput permission to execute it.
    This is known as "inverse data flow" in React
    */
    this.setState({ item: "" }, () => this.refs.item.focus());
    /*
    After we invoke the callback, we use the state to reset the text input value, since these 2 value
    are synced, the UI will change too. The second argument to this.setState is a callback function that gets
    executed when the setState operation here is done.
    In there, this code uses a DOM api call to focus the text input element. This is an example of going
    beyond React's virtual DOM and accessing raw DOM API on elements. To access the element in the DOM directly, 
    we identify it with a ref="item", then use this.refs.item to access it.
    */
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          ref="item"
          onChange={this.onChange}
          value={this.state.item}
        />
        <input type="submit" value="Add" />
      </form>
    );
  }
}

export default TodoList;
