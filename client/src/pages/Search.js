import React, { Component } from "react";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
import { Link } from "react-router-dom";
import { List, ListItem } from "../components/List";

class Search extends Component {
    state = {
        books: [],
        search: "", //searching by book title
    };

    componentDidMount() {
        this.setState(
            {
                books: [],
                search: ""
            }
        )
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value});
        console.log(this.state.search);
    }

    handleFormSubmit = event => {
        event.preventDefault();
        
            API.searchBooks(this.state.search)
                .then(({data: {items}} ) => this.setState(
                    {books: items,
                    search: ""}
                    ))
                .catch(err => console.log(err));
        
    }
//.saveBook(book.volumeInfo.title, book.volumeInfo.authors, book.volumeInfo.imageLinks.thumbnail, book.volumeInfo.infoLink, book.volumeInfo.description)}>
    saveBook(title, author, image, link, description){
        var newBook = {
            title: title,
            author: author,
            description: description,
            image: image,
            link: link
        };
        API.saveBook(newBook)
            .then(
                alert("Book saved!")
            )
            .catch(err => console.log(err));
    };

    render() {
        return (
            <Container fluid>
                <div className="jumbotron" style={{color: "red"}}>
                    (React) Google Books Search
                </div>
                <Row>
                    <Col size="md-6">
                        <h1>Enter a book to search!</h1>
                        <form>
                        <Input
                            value={this.state.search}
                            onChange={this.handleInputChange}
                            name="search"
                            placeholder="Enter a book title please"
                        />
                        <FormBtn
                            disabled={!(this.state.search)}
                            onClick={this.handleFormSubmit}
                        >
                            Search Book
                        </FormBtn>
                        </form>
                    </Col>
                    <Col size="md-12">
                        <div className="jumbotron">
                            <h1>Results</h1>
                        </div>
                        {this.state.books.length ? (
                            <List>
                                {this.state.books.map(book => (
                                    <ListItem>
                                        <Row>
                                            <Col size="md-4">
                                                <strong>
                                                    {book.volumeInfo.title} by
                                                    {book.volumeInfo.authors[0]}
                                                </strong>
                                            </Col>
                                            <Col size="md-4"></Col>
                                            <Col size="md-2">
                                                <a href={book.volumeInfo.infoLink}>
                                                    <button style={{width: "100%", height: "auto"}}>
                                                        View
                                                    </button>
                                                </a>
                                            </Col>
                                            <Col size="md-2">
                                                <button style={{width: "100%", height: "auto"}} onClick={() => this.saveBook(book.volumeInfo.title, book.volumeInfo.authors, book.volumeInfo.imageLinks.thumbnail, book.volumeInfo.infoLink, book.volumeInfo.description)}>
                                                    Save
                                                </button>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col size="md-4">
                                                <img src={book.volumeInfo.imageLinks.thumbnail} style={{width:"100%", height: "auto"}} alt="picture of book"/>
                                            </Col>
                                            <Col size="md-8">
                                                {book.volumeInfo.description}
                                            </Col>
                                        </Row>
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <h3>No Results Yet</h3>
                        )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Search;