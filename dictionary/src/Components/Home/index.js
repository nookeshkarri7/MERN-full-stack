import { Component } from "react"; //imports Component Class From react module
import axios from "axios"; //imports axios Class From react module
import Loader from "react-loader-spinner";

import "./index.css"; //imports CSS
import Header from "../Header"; //imports Header
import DictionaryItem from "../DictionaryItem"; //imports DictionaryItem
import CreateWord from "../CreateWord";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class Home extends Component {
  /*state is used store the values which varies everytime 
        wordsList to store fetched all words data from backend,
        isLoading to show loading while fetching data from backend,
        search is used store search data from header component
    */
  state = {
    wordsList: [],
    isLoading: true,
    search: "",
  };

  //it works only one time after render ,it doesnt rerenders data like state
  componentDidMount() {
    this.getData();
    //calls getData method
  }

  //used to get all words data from backend and updates in state
  getData = async () => {
    const dictionaryItem = await axios.get("http://localhost:4000/view/");
    const data = dictionaryItem.data;
    console.log(data);
    this.setState((prev) => ({
      wordsList: [...prev.wordsList, ...data],
      isLoading: false,
    }));
  };

  //In this word is came from CreateWord component and updates state
  sendWordData = (word) => {
    this.setState((prev) => ({
      wordsList: [...prev.wordsList, word.data],
    }));
  };

  //When user enters any text in search box in header it stores inn state
  fiterData = (search) => {
    this.setState({ search: search });
  };

  //this method is used filter data based search input
  getSearchedList = () => {
    const { wordsList, search } = this.state;
    let fiteredList;
    /* if search text is empty,wordsList is assigned to  fiteredList variable 
     and it shows all data to user 
        if search input is given filter method is used to filter data from 
        words list in which word tilte matches the search text 
    */
    if (search === undefined) {
      fiteredList = wordsList;
    } else {
      const filteredData = wordsList.filter((each) =>
        each.title.toLowerCase().includes(search.toLowerCase())
      );
      fiteredList = filteredData;
    }
    return fiteredList;
  };

  render() {
    const { isLoading } = this.state;
    const wordsList = this.getSearchedList(); //used to get filtered data
    return (
      <div className="bg-main-container">
        <Header fiterData={this.fiterData} />
        <div className="bg-wordslist-container">
          <div className="wordslist-title-container">
            <p className="wordslist-title">Words List</p>
          </div>
          {isLoading ? (
            <div className="loader-div">
              <Loader type="ThreeDots" color="#622547" height={80} width={80} />
            </div>
          ) : (
            <div className="wordslist-inner-container">
              {wordsList.map((eachDictionaryItem) => (
                <DictionaryItem
                  eachItem={eachDictionaryItem}
                  key={eachDictionaryItem._id}
                />
              ))}
            </div>
          )}
          <div className="d-flex flex-row justify-content-end shadow-lg">
            <button
              type="button"
              className="btn addButton"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              <i className="fas fa-plus"></i>
            </button>

            <div
              className="modal fade"
              id="exampleModal"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Add to Dictionary
                    </h5>
                  </div>
                  <CreateWord sendWordData={this.sendWordData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
