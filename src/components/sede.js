import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import socket from "./socket";

function Sede() {
  const [nombre, setNombre] = useState("German");
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    socket.emit("conectado", nombre);
  }, [nombre]);

  useEffect(() => {
    socket.on("mensajes", (mensaje) => {
      // setMensajes([...mensajes, mensaje]);
      console.log(mensaje);
    });
    return () => {
      socket.off();
    };
  }, [mensajes]);

  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="danger">Go somewhere</Button>
        </Card.Body>
      </Card>
      <div>
        {mensajes.map((m, i) => (
          <div key={i}>{m.mensaje}</div>
        ))}
      </div>
    </div>
  );
}

export default Sede;
