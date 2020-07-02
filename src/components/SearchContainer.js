import React from "react";
import { DebounceInput } from "react-debounce-input";
import LoaderContainer from "./LoaderContainer";

class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      warning: false,
      page: 1,
      loading: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
      warning: false,
      page: 1,
      loading: false
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.value.length > 2) {
      this.props.handleSearch(this.state.value);
      this.setState({ value: "", loading: true });
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
          <input className="search-button" type="submit" value="Search" />
        </form>
        {this.state.loading && (
          <LoaderContainer></LoaderContainer>
          )}
        {this.state.warning && (
          <small>Keyword must be at least 3 characters!</small>
        )}
      </div>
    );
  }
}

export default SearchContainer;
