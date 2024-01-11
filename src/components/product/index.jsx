import axios from "axios";
import { useEffect, useState } from "react"
import { Button, Container, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "reactstrap"
import { config, url } from "../api";

const Product = () =>{
     const [user, setUser] = useState([]);
     const [product, setProduct] = useState([]);
     const [editProduct, setEditProduct] = useState([]);
     const [addproductModal, setProductModal] = useState(false);
     
     useEffect(() => {
       getUser();
     },[])
     const openProductModal = () =>setProductModal(!addproductModal)

     const getUser = () => {
      axios.get(`${url}user`, config)
        .then(res => setUser(res.data.object))
        .catch(() => console.log("user kelmadi"))
    }
    console.log(user);

     const getPro = () =>{
      axios.post(`${url}product`, config)
      .then(res => setProduct(res.data.body))
      .catch(() => console.log("product kelmadi"))
     }

  return (
    <>
        <div className="productTable">
          <Container>
            <h1 className='text-center  '>Product List</h1>
            <Button 
            className="addBtnClass"
            color='primary'
             onClick={openProductModal}
            > +Add Product

            </Button>
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
              hover
              className='mt-5'>
              <thead className="table-dark">
                <tr className="text-center">
                  <th>№</th>
                  <th>Name</th>
                  <th>Measure</th>
                  <th>Transport</th>
                  <th>ProductStatus</th>
                  <th>Address</th>
                  <th colSpan={2}>Action</th>
                </tr>
              </thead>
              <tbody className="text-center user-tbody">
                {product.map((item,i) =>
                <tr key={item.id}>
                  <td>{item+1}</td>
                  
                  <td>Measure</td>
                  <td>Transport</td>
                  <td>Product</td>
                  <td>Adress</td>
                  <td>
                   <Button 
                    color="warning"
                    className="px-4 py-1 my-1"
                    outline

                   >Edit
                   </Button>
                   </td>
                   <td>
                    <Button
                     outline
                     color="info"
                     className="px-4 py-1 my-1"
                    >Cancel</Button>
                   </td>
                </tr>
              )}
              </tbody>
              </Table>
              <Modal isOpen = {addproductModal} scrollable centered size = 'xl'>
                <ModalHeader toggle={openProductModal} className="fs-5">
                  <span className="fs-4 fw-bold me-2">Add Product</span>
                </ModalHeader>
                <ModalBody className="px-2 px-md-5">
                  
      
                  <Label className="mb-0 ms-1 mt-3" for="ProductId" placeholder = 'Product Id'>Product Id</Label>
                  <Input type="text" id="ProductId" placeholder="Product Id"/>
                  <Label className="mb-0 ms-1 mt-3" for="IdNumber" placeholder = 'Id Number'>Id Number</Label>
                  <Input type="text" id="IdNumber" placeholder="IdNumber"/>
                  <Label className="mb-0 ms-1 mt-3" for="Name" placeholder = 'Name'>Id Number</Label>
                  <Input type="text" id="Name" placeholder="Name"/>
                  <Label className="mb-0 ms-1 mt-3" for="MeasureCount" placeholder = 'MeasureCount'>MeasureCount</Label>
                  <Input type="text" id="MeasureCount" placeholder="MeasureCount"/>
                  <Label className="mb-0 ms-1 mt-3" for="Transport" placeholder = 'Transport'>Transport</Label>
                  <Input type="text" id="Transport" placeholder="Transport"/>
                  <Label className="mb-0 ms-1 mt-3" for="Measure" placeholder = 'Measure'>Id Number</Label>
                  <Input type="text" id="Measure" placeholder="Measure"/>
                  <Label className="mb-0 ms-1 mt-3" for="ProductStatus" placeholder = 'ProductStatus'>Id Number</Label>
                  <Input type="text" id="ProductStatus" placeholder="ProductStatus"/>
                  <Label className="mb-0 ms-1 mt-3" for="Address" placeholder = 'Address'>Id Number</Label>
                  <Input type="text" id="Address" placeholder="Address"/>
                  
                </ModalBody>
                <ModalFooter>
                <Button
                     
                     color="info"
                     className="px-4 py-1 my-1"
                     
                    >Save</Button>
                     <Button
                     
                     color="info"
                     className="px-4 py-1 my-1"
                     onClick={openProductModal}
                    >Cancel</Button>
                </ModalFooter>
              </Modal>
          </Container>
        </div>
    </>
  )
}
export default Product