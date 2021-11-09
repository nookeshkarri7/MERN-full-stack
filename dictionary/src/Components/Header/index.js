import { Component } from "react"; //imports Component Class From react module
import "./index.css";

class Header extends Component {
  state = { isSearchClicked: false };
  mainHeader = () => {
    return (
      <>
        <div className="sub-container">
          <h1 className="header-title">Vocab</h1>
        </div>
        <div className="sub-container">
          <button
            type="button"
            className="search-button"
            onClick={this.searchClicked}
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
      </>
    );
  };

  searchInputChanged = (event) => {
    const { fiterData } = this.props;
    fiterData(event.target.value);
  };

  searchButton = () => {
    return (
      <>
        <div className="sub-container search-box-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search"
            onChange={this.searchInputChanged}
          />
        </div>
        <div className="sub-container">
          <button
            type="button"
            className="search-button"
            onClick={this.searchClicked}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </>
    );
  };

  searchClicked = () => {
    this.setState((prev) => ({ isSearchClicked: !prev.isSearchClicked }));
  };

  render() {
    const { isSearchClicked } = this.state;
    return (
      <div className="bg-header-main-container">
        {isSearchClicked ? this.searchButton() : this.mainHeader()}
      </div>
    );
  }
}
export default Header;
