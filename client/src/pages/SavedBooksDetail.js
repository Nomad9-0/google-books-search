import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import savedAPI from "../utils/savedAPI";

class SavedBooksDetail extends Component {
  state = {
    book: {}
  };

  componentDidMount() {
    savedAPI.getGoogleBooks(this.props.match.params.id)
    .then(res => {
        console.log("response in getgooglebooks: ",res.data.items);
        console.log("response length: ", res.data.items.length);
        for (var i=0; i < 1; i++) {
          var id = res.data.items[i].id;
          console.log("id: ",id);
          var title = res.data.items[i].volumeInfo.title;
          var authors = res.data.items[i].volumeInfo.authors.join(", ");
          console.log("authors: ", authors);
          var description = res.data.items[i].volumeInfo.description;
          var image = res.data.items[i].volumeInfo.imageLinks.smallThumbnail;
          var link = res.data.items[i].volumeInfo.canonicalVolumeLink;
          var newBook = {
            id: id, 
            title: title,
            authors: authors,
            description: description,
            image: image,
            link: link,
          };
          this.setState({book: newBook});
        }
        console.log("book in getgooglebooks: ", this.state.book);
      })
      .catch(err => console.log(err));
    }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
            <div className="image"><img alt={this.state.book.title} src={this.state.book.image}></img></div>
              <h1>
                {this.state.book.title} 
              </h1>
              by 
              <h2>{this.state.book.authors}
              </h2>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h1>Description</h1>
              <p>
                {this.state.book.description}
              </p>
              <div><a className="right3" href={this.state.book.link}>{this.state.book.link}</a></div>
            </article>
          </Col>
        </Row>
        <Row>
          <Col size="md-6">
            <br></br>
            <Link to={"/saved"}>← Back to Saved Books</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SavedBooksDetail;