import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function BrandExample() {
  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            Supply Chain Manager Dashboard
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default BrandExample;
