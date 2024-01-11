import axios from "axios";
import { useEffect, useState } from "react"
import {
  Button,
  Container,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table
} from "reactstrap"
import { config, url } from "../api";
import NavbarAdmin from "../navbar";
import "./style.css";

const Product = () => {

  const [addproductModal, setProductModal] = useState(false);
  const [userGetMe, setUserGetMe] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const openProductModal = () => setProductModal(!addproductModal)

  const getProduct = () => {
    let userId = sessionStorage.getItem("userId")
    axios.get(url + "user/getMe/" + userId, config)
      .then(res => setUserGetMe(res.data))
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

          <Table
            style={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
            }}
            bordered
            outline
            striped
            scrollable
            hover
            className='mt-5'>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center user-tbody">
              <tr>
                <td>1</td>
                <td>Name</td>
                <td>idNumber</td>
                <td>transport</td>
                <td>productStatus</td>
                <td>measure</td>
                <td>measureCount</td>
                <td>address</td>
                <td>
                  <Button
                    color="warning"
                    className="px-4 py-1 my-1"
                    outline>Edit</Button>
                </td>
              </tr>
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