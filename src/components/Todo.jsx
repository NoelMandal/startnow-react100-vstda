import React, { Component } from "react";

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      newPriority: "",
      newDescription: ""
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
  }

  handleOnChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  edit() {
    this.setState({ editing: true });
  }

  save() {
    this.props.saveText(
      {
        description: this.refs.editedtext.value,
        priority: this.state.newPriority
      },
      this.props.index
    );
    this.setState({ editing: false });
    // new set state for input change
  }

  remove() {
    this.props.deleteTodo(this.props.index);
  }

  editForm() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h5>Description</h5>
            <textarea
              ref="editedtext"
              name="newDescription"
              className="update-todo-text form-control font-weight-normal"
              onChange={this.handleOnChange}
              defaultValue={this.props.details.description}
              rows="3"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <h5>Priority</h5>
            <select
              name="newPriority"
              className="update-todo-priority custom-select mr-sm-2 text-muted font-weight-normal"
              value={this.state.newPriority}
              onChange={this.handleOnChange}
            >
              <option>Select a Priority</option>
              <option value="1">I could do this later</option>
              <option value="2">Midkey Important</option>
              <option value="3">MUY IMPORTANTE!</option>
            </select>
          </div>
        </div>

        <button
          type="button"
          name="save"
          onClick={this.save}
          className="update-todo btn btn-success pull-right"
        >
          Save
        </button>
      </div>
    );
  }

  normalMode() {
    return (
      <div>
        <input type="checkbox" />
        <span className="w-100">{this.props.details.description}</span>
        <button
          type="button"
          onClick={this.remove}
          className="delete-todo btn btn-link pull-right"
        >
          <i className="fas fa-trash-alt fa-md" />
        </button>
        <button
          type="button"
          onClick={this.edit}
          className="edit-todo btn btn-link pull-right"
        >
          <i className="far fa-edit fa-md" />
        </button>
      </div>
    );
  }

  render() {
    var color = "";
    if (this.props.details.priority == 1) {
      color = "list-group-item list-group-item-success font-weight-bold mb-0";
    } else if (this.props.details.priority == 2) {
      color = "list-group-item list-group-item-warning font-weight-bold mb-0";
    } else {
      color = "list-group-item list-group-item-danger font-weight-bold mb-0";
    }

    return (
      <li className={color}>
        {this.state.editing ? this.editForm() : this.normalMode()}
      </li>
    );
  }
}
