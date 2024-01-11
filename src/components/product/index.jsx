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
import { config, url } from "../api";
import NavbarAdmin from "../navbar";
import "./style.css";

const Product = () => {

  const [addproductModal, setProductModal] = useState(false);
  const [userGetMe, setUserGetMe] = useState([]);
  const [productDtoS, setProductDtoS] = useState([]);

  useEffect(() => {
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

  return (
    <>
      <NavbarAdmin />
      <div className="productTable">
        <Container>
          <h1 className='text-center mb-4'>Product List</h1>
          <Button
            className="addBtnClass"
            color='primary'
            onClick={openProductModal}>Add Product</Button>
          <Input
            style={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
            }}
            className='w-25 float-end' placeholder='🔍Search..' />

          <Row className="w-100 mt-5">
            <Col className="col-12 col-md-6 pe-0 pe-md-4">
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px dotted",
                paddingBottom: ".5rem",
                fontSize: "1.2rem",
                fontWeight: "700"
              }}>
                <p style={{ marginBottom: "0" }}>First Name:</p>
                <p style={{ marginBottom: "0" }}>{userGetMe.name}</p>
              </div>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px dotted",
                paddingBottom: ".5rem",
                fontSize: "1.2rem",
                fontWeight: "700"
              }}>
                <p style={{ marginBottom: "0" }}>Phone Number:</p>
                <p style={{ marginBottom: "0" }}>{userGetMe.phoneNumber}</p>
              </div>
            </Col>
            <Col className="col-12 col-md-6 ps-0 pe-0 ps-md-4">
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px dotted",
                paddingBottom: ".5rem",
                fontSize: "1.2rem",
                fontWeight: "700"
              }}>
                <p style={{ marginBottom: "0" }}>Id Number:</p>
                <p style={{ marginBottom: "0" }}>{userGetMe.idNumber}</p>
              </div>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px dotted",
                paddingBottom: ".5rem",
                fontSize: "1.2rem",
                fontWeight: "700"
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
          <Modal isOpen={addproductModal} scrollable centered size='xl'>
            <ModalHeader toggle={openProductModal} className="fs-5">
              <span className="fs-4 fw-bold me-2">Add Product</span>
            </ModalHeader>
            <ModalBody className="px-2 px-md-5">
              <Label className="mb-0 ms-1 mt-3" for="ProductId" placeholder='Product Id'>Product Id</Label>
              <Input type="text" id="ProductId" placeholder="Product Id" />
              <Label className="mb-0 ms-1 mt-3" for="IdNumber" placeholder='Id Number'>Id Number</Label>
              <Input type="text" id="IdNumber" placeholder="IdNumber" />
              <Label className="mb-0 ms-1 mt-3" for="Name" placeholder='Name'>Id Number</Label>
              <Input type="text" id="Name" placeholder="Name" />
              <Label className="mb-0 ms-1 mt-3" for="MeasureCount" placeholder='MeasureCount'>MeasureCount</Label>
              <Input type="text" id="MeasureCount" placeholder="MeasureCount" />
              <Label className="mb-0 ms-1 mt-3" for="Transport" placeholder='Transport'>Transport</Label>
              <Input type="text" id="Transport" placeholder="Transport" />
              <Label className="mb-0 ms-1 mt-3" for="Measure" placeholder='Measure'>Id Number</Label>
              <Input type="text" id="Measure" placeholder="Measure" />
              <Label className="mb-0 ms-1 mt-3" for="ProductStatus" placeholder='ProductStatus'>Id Number</Label>
              <Input type="text" id="ProductStatus" placeholder="ProductStatus" />
              <Label className="mb-0 ms-1 mt-3" for="Address" placeholder='Address'>Id Number</Label>
              <Input type="text" id="Address" placeholder="Address" />
            </ModalBody>
            <ModalFooter>
              <Button
                color="info"
                className="px-4 py-1 my-1">Save</Button>
              <Button
                color="info"
                className="px-4 py-1 my-1"
                onClick={openProductModal}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </Container>
      </div>
    </>
  )
}
export default Product