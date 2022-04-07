import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter as Router , Routes, Route, Link } from "react-router-dom";

import EditItem from "./components/List/edit.component";
import List from "./components/List/list.component";
import CreateItem from "./components/List/create.component";

function App() {
  return (<Router>
    <Navbar bg="primary">
      <Container>
        <Link to={"/"} className="navbar-brand text-white">
          Basic To-do List App
        </Link>
      </Container>
    </Navbar>

    <Container className="mt-5">
      <Row>
        <Col md={12}>
          <Routes>
            <Route path="/List/create" element={<CreateItem />} />
            <Route path="/List/edit/:id" element={<EditItem />} />
            <Route exact path='/' element={<List />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  </Router>);
}

export default App;