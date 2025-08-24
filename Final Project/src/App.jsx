import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Container,Row,Col,Button,Alert,Badge, Breadcrumb, Card,Form } from 'react-bootstrap';
function App() {

  return (
    <div className="App">
    <header className="App-header">
<Container>
<Form>
  <Row>
    <Col>
<Form.Group className="mb-3" controlId="formBasicEmail">
  <Form.Label>Email address</Form.Label>
  <Form.Control type="email" placeholder="Enter email" />
  <Form.Text className="text-muted">
    We'll never share your email with anyone else.
  </Form.Text>
     </Form.Group>
  </Col>
  <Col>
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  </Col>

</Row>
<Button variant="secondary" type="submit">Submit</Button>
</Form>

      <Button variant="primary">Primary</Button>
      <Alert variant=''>This is a success alert—check it out!</Alert>
       <div>
      <h1>
        Example heading
        <Badge bg="secondary" as={Button}>
          New
        </Badge>
      </h1>
    </div>

    <Breadcrumb>
      <Breadcrumb.Item >Home</Breadcrumb.Item>
      <Breadcrumb.Item>About</Breadcrumb.Item>
      <Breadcrumb.Item active>Contact</Breadcrumb.Item>
    </Breadcrumb>
    <Card>
      <Card.Img src={viteLogo} alt="Card image" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          This is a simple card with an image, title, and text.
        </Card.Text>
      </Card.Body>
            <Button variant="secondary">READ MORE</Button>

    </Card>
  </Container>
  </header>
  </div>
  )
}

export default App
