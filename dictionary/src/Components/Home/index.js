import { Component } from "react"; //imports Component Class From react module
import axios from "axios"; //imports axios Class From react module
import Loader from "react-loader-spinner";

import "./index.css"; //imports CSS
import Header from "../Header"; //imports Header
import DictionaryItem from "../DictionaryItem"; //imports DictionaryItem
import CreateWord from "../CreateWord";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class Home extends Component {
  state = {
    wordsList: [],
    isLoading: true,
    search: "",
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const dictionaryItem = await axios.get("http://localhost:4000/view/");
    const data = dictionaryItem.data;
    //console.log(data);
    this.setState((prev) => ({
      wordsList: [...prev.wordsList, ...data],
      isLoading: false,
    }));
  };

  sendWordData = (word) => {
    this.setState((prev) => ({
      wordsList: [...prev.wordsList, word.data],
    }));
  };

  fiterData = (search) => {
    this.setState({ search: search });
  };



  getSearchedList = () => {
    const { wordsList, search } = this.state;
    console.log(search);

    let fiteredList;
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
    const wordsList = this.getSearchedList();
    console.log(wordsList);
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
