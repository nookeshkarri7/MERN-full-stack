import { Component } from "react"; //imports Component Class From react module
import "./index.css"; //imports css styles

class Header extends Component {
  /* Here state is used to show search box when user clicks search icon */
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

  //this method activates when user enter any data in search box
  searchInputChanged = (event) => {
    const { fiterData } = this.props;
    //this sends data to home to filter words based on search text
    fiterData(event.target.value);
  };

  //search input JSX
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

  //when user clicks search button it updates state and re renders data
  searchClicked = () => {
    this.setState((prev) => ({ isSearchClicked: !prev.isSearchClicked }));
  };

  render() {
    const { isSearchClicked } = this.state;
    return (
      <div className="bg-header-main-container">
        {
          /*  used ternary operator to show data based on condition
            if isSearchClicked is true - shows search input box
            else search icon
          */
          isSearchClicked ? this.searchButton() : this.mainHeader()
        }
      </div>
    );
  }
}
export default Header;
