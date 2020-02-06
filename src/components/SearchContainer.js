import React from "react";
import { DebounceInput } from "react-debounce-input";

class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    console.log(`PROPS INSIDE SEARCHCONTAINER`, props);

    this.state = {
      value: "",
      warning: false,
      typing: false,
      page: 1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
      warning: false,
      typing: true
    });
    console.log(`VALUE inside SearchContainer handleChange`, this.state.value);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.value.length > 2) {
      this.props.handleSearch(this.state.value);
      console.log(
        `VALUE inside SearchContainer handleSubmit`,
        this.state.value
      );
      //this.setState({ value: "" });
    } else {
      this.setState({ warning: true });
    }
  }

  render() {
    return (
      <div className="search-container">
        <form className="photo-search-form" onSubmit={this.handleSubmit}>
          <label className="input-keyword">
            <DebounceInput
              type="text"
              minLength={2}
              debounceTimeout={300}
              onChange={this.handleChange}
              value={this.state.value}
            />
          </label>
          <input className="searchBtn" type="submit" value="Search" />
        </form>
        {this.state.warning && (
          <small>Keyword must be at least 3 characters!</small>
        )}
      </div>
    );
  }
}

export default SearchContainer;
