import { Component } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import "./index.css";

class DetailedView extends Component {
  state = { wordsList: [], isLoading: true };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const { id } = this.props.match.params;
    const response = await axios.get(
      `http://localhost:4000/word-details/${id}`
    );
    console.log(response.data);
    this.setState({ wordsList: response.data, isLoading: false });
  };

  goToHome = () => {
    const { history } = this.props;
    history.replace("/");
  };

  render() {
    const { wordsList, isLoading } = this.state;

    return (
      <div className="detailed-view-container">
        <div className="close-button-container">
          <button onClick={this.goToHome} className="close-button">
            <i className="fas fa-times"></i>
          </button>
        </div>
        {isLoading ? (
          <div className="loader-div">
            <Loader type="ThreeDots" color="#622547" height={80} width={80} />
          </div>
        ) : (
          <div>
            <h1 className="main-heading">{wordsList.title}</h1>
            <p className="para-low">{wordsList.lexicalCategory}</p>
            <p className="para-low">Origin {wordsList.etymologies}</p>
            <p className="para-bold">{wordsList.description}</p>
            <ul>
              <li className="para-bold">{wordsList.examples}</li>
            </ul>
            <hr />
            <p className="para-low">{wordsList.secondlexicalCategory}</p>
            <p className="para-bold">{wordsList.secondDefinition}</p>
            <ul>
              <li className="para-bold">{wordsList.secondExamples}</li>
              {wordsList.thirdExamples && (
                <li className="para-bold"> {wordsList.thirdExamples}</li>
              )}
            </ul>
            <hr />
          </div>
        )}
      </div>
    );
  }
}

export default DetailedView;
