import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import NavBar from "../../navbar/NavBar";
import alertToastify from "../../../hooks/AlertToastify";
import {
  Card,
  Col,
  Row,
  Button,
  Drawer,
  Space,
  FloatButton,
  Avatar,
  Modal,
  Table,
  InputNumber,
} from "antd";
import axios from "axios";

const { Meta } = Card;

const Productos = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carrito, setCarrito] = useState(
    window.localStorage.getItem("carrito")
      ? JSON.parse(window.localStorage.getItem("carrito"))
      : []
  );
  const [open, setOpen] = useState(false);

  const columns = [
    {
      title: "Producto",
      dataIndex: "producto",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Precio",
      className: "column-money",
      dataIndex: "money",
      align: "right",
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad",
      render: (text, record) => (
        <InputNumber
          min={1}
          defaultValue={record.cantidad}
          onChange={(value) => handleQuantityChange(value, record.key)}
        />
      ),
    },
    {
      title: "Sub Total",
      dataIndex: "subtotal",
      render: (text, record) => `Q.${record.money * record.cantidad}`,
    },
    {
      title: "Accion",
      dataIndex: "accion",
    },
  ];

  const handleQuantityChange = (value, key) => {
    const updatedCarrito = carrito.map((item) => {
      if (item.id === key) {
        return { ...item, cantidad: value };
      }
      return item;
    });
    setCarrito(updatedCarrito);
    window.localStorage.setItem("carrito", JSON.stringify(updatedCarrito));
  };

  const showModal = () => {
    if (carrito.length === 0) {
      alertToastify("error", "Seleccione un producto antes de crear un pedido");
    } else {
      navigate("./pedido", { state: { carrito } });
    }
  };
  const handleOk = () => {
    setIsModalOpen(false);
    navigate("/login");
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const Comprar = (producto) => {
    const productoEncontrado = carrito?.find(
      (productoCarrito) => productoCarrito.id === producto.id
    );

    if (!productoEncontrado) {
      const newCarrito = [...carrito, { ...producto, cantidad: 1 }];
      setCarrito(newCarrito);
      window.localStorage.setItem("carrito", JSON.stringify(newCarrito));
    } else {
      alert(`El producto ${producto.nombreProducto} ya ha sido seleccionado.`);
    }
  };

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/productos/get/listProductsAll"
        );
        setProductos(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProductos();
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  const FinalizarCompras = () => {
    setOpen(true);
  };

  return (
    <div className="px-5">
      <div className="flex flex-col w-full h-1/5">
        <NavBar />
      </div>
      <Row justify="end" align="top"></Row>
      <br />
      <br />
      <Row gutter={[16, 16]} justify="center">
        {productos?.map((producto) => (
          <Col xs={24} sm={12} md={8} lg={5} key={producto.id}>
            <Card
              hoverable
              style={{ width: "100%", height: "auto" }} // Cambiar a 100% para que sea responsivo
              cover={
                <img
                  alt={producto.id}
                  src={producto.url} // Assuming each product object has a 'urlImagen' property
                  style={{ objectFit: "cover", height: 200 }}
                />
              }
            >
              <Meta
                title={producto.nombreProducto}
                description={producto.descripcion}
              />
              <br />
              <br />
              <h3>Precio: Q.{producto.precio}</h3>
              <br />
              <Row justify="center" align="top">
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#ff4d4f",
                    borderColor: "#ff4d4f",
                  }}
                  onClick={() => Comprar(producto)}
                >
                  Seleccionar
                </Button>
              </Row>
            </Card>
            <br />
          </Col>
        ))}
      </Row>
      <FloatButton
        shape="circle"
        icon={<ShoppingCartOutlined />}
        style={{
          top: 300 - 70,
        }}
        tooltip={<div>Productos seleccionados</div>}
        badge={{
          count: carrito?.length ?? 0,
          color: "volcano",
        }}
        onClick={() => FinalizarCompras()}
      />

      <Drawer
        title="Compra"
        placement="right"
        width={650}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              style={{
                backgroundColor: "#ff4d4f",
                borderColor: "#ff4d4f",
              }}
              type="primary"
              onClick={onClose}
            >
              OK
            </Button>
          </Space>
        }
      >
        <h1>Productos seleccionados</h1>
        <br />
        <br />
        <Table
          columns={columns}
          dataSource={
            carrito?.map((producto) => ({
              key: producto.id,
              producto: producto.nombreProducto,
              money: producto.precio,
              cantidad: producto.cantidad || 1,
              accion: (
                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    const productoEncontrado = carrito?.find(
                      (productoCarrito) => productoCarrito.id === producto.id
                    );

                    if (productoEncontrado) {
                      const index = carrito?.indexOf(productoEncontrado);
                      carrito?.splice(index, 1);
                      setCarrito([...carrito]);
                      window.localStorage.setItem(
                        "carrito",
                        JSON.stringify([...carrito])
                      );
                    }
                  }}
                >
                  Eliminar
                </Button>
              ),
            })) || []
          }
          pagination={false}
          footer={() => (
            <h2>
              Total: Q.
              {carrito?.reduce(
                (acc, producto) =>
                  acc + producto.precio * (producto.cantidad || 1),
                0
              ) ?? 0}
            </h2>
          )}
        />

        <Button
          type="primary"
          className="btn btn-danger"
          style={{
            backgroundColor: "#FFD700",
            borderColor: "#FFD700",
          }}
          onClick={() => {
            setCarrito([]);
            window.localStorage.setItem("carrito", JSON.stringify([]));
          }}
        >
          Limpiar Carrito
        </Button >
        <br />
        <br />
        <Button
          style={{
            backgroundColor: "#ff4d4f",
            borderColor: "#ff4d4f",
          }}
          type="primary border"
          onClick={showModal}
        >
          Crear Pedido
        </Button>
        <Modal
          title="Confirmar pedido"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Si"
          cancelText="No"
        >
          <p>¿Está seguro?</p>
        </Modal>
      </Drawer>
    </div>
  );
};

export default Productos;
