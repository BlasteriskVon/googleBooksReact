import React, { Component } from "react";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { Link } from "react-router-dom";
import { List, ListItem } from "../components/List";

class Saved extends Component {
    state = {
        books: []
    };

    componentDidMount() {
        this.loadBooks();
    }

    loadBooks = () => {
        API.getBooks()
            .then(res => this.setState({books: res.data}))
            .catch(err => console.log(err));
    };

    deleteBook = id => {
        API.deleteBook(id)
            .then(res => this.loadBooks())
            .catch(err => console.log(err));
    };

    render() {
        return (
            <Container fluid>
                <div className="jumbotron" style={{color: "red"}}>
                    (React) Google Books Search
                </div>
                <Row>
                    <Col size="md-12">
                        <List>
                            {this.state.books.map(book => (
                                <ListItem>
                                    <Row>
                                        <Col size="md-4">
                                            <strong>
                                                {book.title} by
                                                {book.author[0]}
                                            </strong>
                                        </Col>
                                        <Col size="md-4"></Col>
                                        <Col size="md-2">
                                        <a href={book.link}>
                                                <button style={{width: "100%", height: "auto"}}>
                                                    View
                                                </button>
                                            </a>
                                        </Col>
                                        <Col size="md-2">
                                            <button style={{width: "100%", height: "auto"}} onClick={() => this.deleteBook(book._id)}>
                                                Delete
                                            </button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col size="md-4">
                                            <img src={book.image} style={{width:"100%", height: "auto"}} alt="picture of book"/>
                                        </Col>
                                        <Col size="md-8">
                                            {book.description}
                                        </Col>
                                    </Row>
                                </ListItem>
                            ))}
                        </List>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Saved;