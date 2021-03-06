import React, { Component } from "react";
import Todo from "./components/Todo";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      priority: "",
      todos: []
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeComment = this.removeComment.bind(this);
    this.saveComment = this.saveComment.bind(this);
    this.eachComment = this.eachComment.bind(this);
  }

  handleOnChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    var newArray = this.state.todos.slice();
    if (this.state.description != "" && this.state.priority != 0) {
      newArray.push({
        description: this.state.description,
        priority: this.state.priority
      });
      this.setState({ todos: newArray });
    } else {
      alert("Missing Description or Priority");
      return null;
    }
  }

  eachComment(details, i) {
    return (
      <Todo
        key={details.description + i}
        index={i}
        details={details}
        saveText={this.saveComment}
        deleteTodo={this.removeComment}
      />
    );
  }

  removeComment(i) {
    var arr = this.state.todos.slice();
    arr.splice(i, 1);
    this.setState({ todos: arr });
  }

  saveComment(editedText, i) {
    var arr = this.state.todos.slice();
    arr[i] = editedText;
    this.setState({ todos: arr });
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-white">Very Simple Todo App</h1>
        <p className="text-white">Track All Of The Things</p>
        <hr className="bg-white" />

        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-header font-weight-bold">Add New Todo</div>
              <div className="card-body">
                <span className="text font-weight-bold">I want to..</span>
                <textarea
                  name="description"
                  className="create-todo-text form-control"
                  value={this.state.description}
                  onChange={this.handleOnChange}
                  placeholder="What Chu Tryna Do?!"
                  rows="3"
                />
                <br />

                <span className="text font-weight-bold">
                  How much of a priority is this?
                </span>
                <select
                  name="priority"
                  className="create-todo-priority form-control"
                  value={this.state.priority}
                  onChange={this.handleOnChange}
                >
                  <option value="0">Select a Priority</option>
                  <option value="1">Not Important</option>
                  <option value="2">Semi-Important</option>
                  <option value="3">MUY IMPORTANTE!</option>
                </select>
                {/* card body */}
              </div>

              <div className="card-footer text-center">
                <button
                  type="button"
                  onClick={this.handleSubmit}
                  className="create-todo btn btn-success btn-block"
                >
                  IKUZO!
                </button>
              </div>

              {/* within card 1 */}
            </div>
            {/* within col-4 */}
          </div>

          <div className="col-md-8">
            <div className="card">
              <div className="card-header font-weight-bold">View Todos</div>
              <ul className="list-group">
                {this.state.todos.length ? (
                  this.state.todos.map(this.eachComment)
                ) : (
                  <li className="list-group-item list-group-item-primary font-weight-bold">
                    <span>Welcome to Very Simple Todo App!</span>
                    <br />
                    <a className="font-weight-normal">
                      Get started now by adding a new todo on the left
                    </a>
                  </li>
                )}
              </ul>
              {/* within card 2 */}
            </div>
            {/* within col-8 */}
          </div>
          {/* within row */}
        </div>
      </div>
    );
  }
}

export default App;
