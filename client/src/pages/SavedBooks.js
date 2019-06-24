import React, { Component } from "react";
import ViewBtn from "../components/ViewBtn";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import savedAPI from "../utils/savedAPI";
import { Link } from "react-router-dom";
import { List, ListItem } from "../components/List";
import "./style.css";

class SavedBooks extends Component {
  
  state = {
    books: [],
    title: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    savedAPI.getBooks()
      .then(res => {
        console.log("res in savedAPI load books: ", res.data);
        this.setState({ books: res.data, title: ""})
      })
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    savedAPI.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <div>
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                      <div>
                      <strong>{book.title}                      </strong>
                      </div>
                    <br></br>
                    <div>
                      Written by: {book.authors}
                      <div>
                        <br></br>
                        <div className="image"><img alt={book.title} src={book.image}></img></div>
                        <div className="right">{book.description}</div>
                      </div>
                    </div>
                    <br></br>
                    <div>
                      <a href={book.link}>{book.link}</a>
                    </div>
                    <div>
                      <button className="right2"><Link to={"/saved/" + book.title} style={{ color: '#000' }}>View</Link></button>
                      <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                    </div>
                  </ListItem>
                ))}
              </List>
              </div>
            ) : (
              <h3>No Results to Display</h3>
            )}
      </div>
    );
  }
}

export default SavedBooks;