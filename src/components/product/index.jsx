import axios from "axios";
import { useEffect, useState } from "react"
import {
  Button,
  Col,
  Container,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table
} from "reactstrap"
import { byIdObj, config, setConfig, url } from "../api";
import NavbarAdmin from "../navbar";
import "./style.css";
import { toast } from "react-toastify";
import Xarita from "../map/Xarita";

const Product = () => {

  const [addproductModal, setProductModal] = useState(false);
  const [userGetMe, setUserGetMe] = useState([]);
  const [productDtoS, setProductDtoS] = useState([]);

  useEffect(() => {
    setConfig();
    getProduct();
  }, []);

  const openProductModal = () => setProductModal(!addproductModal)

  const getProduct = () => {
    let userId = sessionStorage.getItem("userId")
    axios.get(url + "user/getMe/" + userId, config)
      .then(res => {
        setUserGetMe(res.data.body);
        setProductDtoS(res.data.body.productDtoS);
      })
      .catch(() => console.log("getMe kelmadi"))
  }

  const addProduct = async () => {
    let latitude = sessionStorage.getItem("lat")
    let longitude = sessionStorage.getItem("long")
    let address = sessionStorage.getItem("address")
    let addData = {
      id: 0,
      idNumber: userGetMe.idNumber,
      name: byIdObj("name").value,
      measureCount: byIdObj("measureCount").value,
      transport: byIdObj("transport").value,
      measure: byIdObj("measure").value,
      productStatus: byIdObj("productStatus").value,
      latitude: latitude,
      longitude: longitude,
      address: address
    }
    let userId = sessionStorage.getItem("userId");
    await axios.post(url + "product?id=" + userId, addData, config)
      .then(() => {
        toast.success("Successfully product saved✔")
        addproductModal();
        getProduct();
      })
      .catch(() => {
        toast.error("Error product saved❌")
      })
  }

  return (
    <>
      <NavbarAdmin />
      <div className="productTable">
        <Container>
          <h1 className='text-center mb-4'>Product List</h1>
          <h2 className=" text-center px-2 font-semibold text-infoColor leading-7">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae itaque sit, eius assumenda id inventore quibusdam consectetur voluptatibus adipisci facilis laboriosam doloremque libero laborum ad fugiat sed voluptate autem rem.</h2>
          <Button
            className="addBtnClass mt-4"
            color='primary'
            onClick={openProductModal}>Add Product</Button>
          <Input
            style={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
            }}
            className='w-25 float-end mt-4' placeholder='🔍Search..' />

          <Row className="w-100 mt-5">
            <Col className="col-12 col-md-6 pe-0 pe-md-4">
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px dotted",
                paddingBottom: ".3rem",
                fontSize: "1.2rem",
                fontWeight: "700",
                marginBottom: "1rem"
              }}>
                <p style={{ marginBottom: "0" }}>First Name:</p>
                <p style={{ marginBottom: "0" }}>{userGetMe.name}</p>
              </div>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px dotted",
                paddingBottom: ".3rem",
                fontSize: "1.2rem",
                fontWeight: "700",
                marginBottom: "1rem"
              }}>
                <p style={{ marginBottom: "0" }}>Phone Number:</p>
                <p style={{ marginBottom: "0" }}>{userGetMe.phoneNumber}</p>
              </div>
            </Col>
            <Col className="col-12 col-md-6 mt-4 mt-md-0 ps-0 pe-0 ps-md-4">
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px dotted",
                paddingBottom: ".3rem",
                fontSize: "1.2rem",
                fontWeight: "700",
                marginBottom: "1rem"
              }}>
                <p style={{ marginBottom: "0" }}>Id Number:</p>
                <p style={{ marginBottom: "0" }}>{userGetMe.idNumber}</p>
              </div>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px dotted",
                paddingBottom: ".3rem",
                fontSize: "1.2rem",
                fontWeight: "700",
                marginBottom: "1rem"
              }}>
                <p style={{ marginBottom: "0" }}>Password:</p>
                <p style={{ marginBottom: "0" }}>{userGetMe.password}</p>
              </div>
            </Col>
          </Row>

          <Table
            style={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              marginTop: "3rem"
            }}
            bordered
            outline
            striped
            scrollable
            hover>
            <thead className="table-dark">
              <tr className="text-center">
                <th>№</th>
                <th>Name</th>
                <th>Id Number</th>
                <th>Transport</th>
                <th>Product Status</th>
                <th>Measure</th>
                <th>Measure Count</th>
                <th>Address</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody className="text-center user-tbody">
              {productDtoS && productDtoS.map((item, i) =>
                <tr key={item.id}>
                  <td>{i + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.idNumber}</td>
                  <td>{item.transport}</td>
                  <td>{item.productStatus}</td>
                  <td>{item.measure}</td>
                  <td>{item.measureCount}</td>
                  <td>{item.address}</td>
                  <td>
                    <Button
                      color="warning"
                      className="px-4 py-1 my-1"
                      outline>Edit</Button>
                  </td>
                  <td>
                    <Button
                      color="info"
                      className="px-4 py-1 my-1"
                      outline>Location</Button>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {/* add product modal */}
          <Modal isOpen={addproductModal} scrollable centered size='lg'>
            <ModalHeader toggle={openProductModal} className="fs-5">
              <span className="fs-4 fw-bold me-2">Add Product</span>
            </ModalHeader>
            <ModalBody>
              <Label className="mb-0 ms-1" for="name">Name</Label>
              <Input type="text" id="name" placeholder="Name" />
              <Label className="mb-0 ms-1 mt-3" for="measure">Measure</Label>
              <select className='form-select' id="measure">
                <option selected disabled>Measure</option>
                <option value="KG">KG</option>
                <option value="PIECE">PIECE</option>
                <option value="KUB">KUB</option>
                <option value="L">L</option>
              </select>
              <Label className="mb-0 ms-1 mt-3" for="measureCount">Measure Count</Label>
              <Input type="text" id="measureCount" placeholder="Measure Count" />
              <Label className="mb-0 ms-1 mt-3" for="transport">Transport</Label>
              <select className='form-select' id="transport">
                <option selected disabled>Transport</option>
                <option value="CAR">CAR</option>
                <option value="AIRPLANE">AIRPLANE</option>
                <option value="TRAIN">TRAIN</option>
              </select>
              <Label className="mb-0 ms-1 mt-3" for="productStatus">Product Status</Label>
              <select className='form-select' id="productStatus">
                <option selected disabled>Product Status</option>
                <option value="CAME_OUT">CAME_OUT</option>
                <option value="ON_THE_WAY">ON_THE_WAY</option>
                <option value="ARRIVED">ARRIVED</option>
                <option value="NOT_CAME_OUT">NOT_CAME_OUT</option>
              </select>

              {/* yandex maps */}
              <Xarita />
              
            </ModalBody>
            <ModalFooter>
              <Button
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                }}
                className='px-4 me-3 fw-bolder'
                color='danger'
                onClick={openProductModal}>Close</Button>
              <Button
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                }}
                className='px-4 fw-bolder'
                color='primary' onClick={addProduct}>Save</Button>
            </ModalFooter>
          </Modal>
        </Container>
      </div>
    </>
  )
}
export default Product