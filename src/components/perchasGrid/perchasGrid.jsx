import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const mockKayaks = [
  { id: 1, nombre: 'Kayak Rojo', estado: 'Disponible', ubicacion: 'Percha 1', capacidad: 2 },
  { id: 2, nombre: 'Kayak Azul', estado: 'Ocupado', ubicacion: 'Percha 2', capacidad: 1 },
  { id: 3, nombre: 'Kayak Verde', estado: 'Disponible', ubicacion: 'Percha 3', capacidad: 2 },
];

function Percha({ kayak, onClick }) {
  const estadoColor = kayak.estado === 'Disponible' ? 'text-success' : 'text-dark';

  return (
    <Card onClick={() => onClick(kayak)} className="text-center cursor-pointer shadow-sm hover:shadow-lg">
      <Card.Body>
        <Card.Title>{kayak.nombre}</Card.Title>
        <Card.Text className={estadoColor}>{kayak.estado}</Card.Text>
      </Card.Body>
    </Card>
  );
}

function MyVerticallyCenteredModal(props) {
  const kayak = props.kayak;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {kayak?.nombre || 'Información del Kayak'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Estado: {kayak?.estado}</h4>
        <p>
          Ubicación: {kayak?.ubicacion} <br />
          Capacidad: {kayak?.capacidad} personas
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Cerrar</Button>
        {kayak?.estado === 'Disponible' && (
          <Button variant="primary" onClick={() => alert(`Reservaste el ${kayak.nombre}`)}>
            Reservar
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

function AgregarKayakModal({ show, onHide, onAgregar }) {
  const [nombre, setNombre] = useState('');
  const [estado, setEstado] = useState('Disponible');
  const [capacidad, setCapacidad] = useState(1);

  const handleSubmit = () => {
    onAgregar({ nombre, estado, capacidad });
    setNombre('');
    setEstado('Disponible');
    setCapacidad(1);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del kayak</Form.Label>
            <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej: Kayak Naranja" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Estado</Form.Label>
            <Form.Select value={estado} onChange={(e) => setEstado(e.target.value)}>
              <option value="Disponible">Disponible</option>
              <option value="Ocupado">Ocupado</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Capacidad</Form.Label>
            <Form.Control type="number" min="1" max="4" value={capacidad} onChange={(e) => setCapacidad(Number(e.target.value))} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
        <Button variant="success" onClick={handleSubmit}>Agregar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function GridPerchas() {
  const [kayaks, setKayaks] = useState(mockKayaks);
  const [selectedKayak, setSelectedKayak] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [modalAgregarShow, setModalAgregarShow] = useState(false);

  const handlePerchaClick = (kayak) => {
    setSelectedKayak(kayak);
    setModalShow(true);
  };

  const handleAgregarKayak = ({ nombre, estado, capacidad }) => {
    const nuevoKayak = {
      id: kayaks.length + 1,
      nombre: nombre || `Kayak ${kayaks.length + 1}`,
      estado,
      capacidad,
      ubicacion: `Percha ${kayaks.length + 1}`
    };
    setKayaks([...kayaks, nuevoKayak]);
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">Kayaks disponibles</h2>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {kayaks.map((kayak) => (
          <Col key={kayak.id}>
            <Percha kayak={kayak} onClick={handlePerchaClick} />
          </Col>
        ))}
      </Row>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        kayak={selectedKayak}
      />

      <AgregarKayakModal
        show={modalAgregarShow}
        onHide={() => setModalAgregarShow(false)}
        onAgregar={handleAgregarKayak}
      />
    </Container>
  );
}
