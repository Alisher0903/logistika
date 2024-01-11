import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
  Table
} from 'reactstrap'
import { byIdObj, config, setConfig, url } from '../api';
import { toast } from 'react-toastify';
import './style.css';
import NavbarAdmin from '../navbar';


const User = () => {
  const [users, setUser] = useState([]);
  const [user, setUserId] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [loading, setLoading] = useState(false);


  const openAddModal = () => setAddModal(!addModal)
  const openEditModal = () => setEditModal(!editModal)
  const openInfoModal = () => setInfoModal(!infoModal)

  useEffect(() => {
    setConfig();
    getUser();
  }, []);

  // get user
  const getUser = () => {
    axios.get(`${url}user`, config)
      .then(res => setUser(res.data.body))
      .catch(() => console.log("user kelmadi"))
  }

  // add user
  function addUser() {
    // setLoading(true);
    let roles = {
      ROLE: byIdObj("roleType").value,
    }

    let addData = {
      name: byIdObj("userName").value,
      phoneNumber: byIdObj("userPhoneNumber").value,
      password: byIdObj("userpassword").value
    }

    if (roles.ROLE === "ROLE_USER") {
      axios.post(`${url}user?ROLE=ROLE_USER`, addData, config)
        .then(() => {
          toast.success("User saved✔");
          openAddModal();
          getUser();
          // setLoading(false);
        })
        .catch(err => {
          toast.error("An error occurred❌")
          console.log(addData);
        });
    } else if (roles.ROLE === "ROLE_ADMIN") {
      axios.post(`${url}user?ROLE=ROLE_ADMIN`, addData, config)
        .then(() => {
          toast.success("Admin saved✔");
          openAddModal();
          getUser();
          // setLoading(false);
        })
        .catch(err => {
          console.log(addData);
          toast.error("An error occurred❌")
        });
    }
  }

  // edit user
  function editUser() {
    // setLoading(true);
    let editData = {
      name: byIdObj("userName").value,
      password: byIdObj("userpassword").value,
      phoneNumber: byIdObj("userPhoneNumber").value
    }

    axios.put(`${url}user/${user.id}`, editData, config)
      .then(() => {
        toast.success("Saccessfully user edit✔");
        openEditModal();
        getUser();
        // setLoading(false);
      })
      .catch(() => toast.error("An error occurred❌"))
  }

  return (
    <>
      <NavbarAdmin />
      <div className='userTable'>
        <Container>
          <h1 className='text-center text-white'>User List</h1>
          <Button
            className='addBtnClass'
            color='primary'
            onClick={openAddModal}>Add User</Button>
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
            <thead className='table-dark'>
              <tr className='text-center'>
                <th>#</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Password</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody className='text-center user-tbody'>
              {users.map((item, i) =>
                <tr key={item.id}>
                  <td>{i + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.password}</td>
                  <td>
                    <Button
                      color='warning'
                      className='px-4 py-1 my-1'
                      outline
                      onClick={() => {
                        setUserId(item);
                        openEditModal()
                      }}>
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      outline
                      color='info'
                      className='px-4 py-1 my-1'
                      onClick={() => {
                        setUserId(item);
                        openInfoModal()
                      }}>
                      Info
                    </Button>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {/* infoModal */}
          <Modal isOpen={infoModal} scrollable centered size='xl'>
            <ModalHeader toggle={openInfoModal} className='fs-5'>
              <span className='fs-4 fw-bold me-2'>{user.name}</span>information
            </ModalHeader>
            <ModalBody></ModalBody>
            <ModalFooter></ModalFooter>
          </Modal>

          {/*    Add User     */}
          <Modal isOpen={addModal} centered size='lg'>
            <ModalHeader
              className='px-2 px-md-5 fs-5'
              toggle={openAddModal}> <span className='fs-4 fw-bold'>Add User</span> </ModalHeader>
            <ModalBody className='px-2 px-md-5'>
              <Label for='roleType' className='mb-0 ms-1 mt-2' form='userName'>Admin or User</Label>
              <select className='form-select' id="roleType">
                <option selected disabled>Admin or User</option>
                <option value="ROLE_ADMIN">Admin</option>
                <option value="ROLE_USER">User</option>
              </select>
              <Label className='mb-0 ms-1 mt-3' for='userName'>Name</Label>
              <Input type='text' id='userName' placeholder='Name' />
              <Label className='mb-0 ms-1 mt-3' for='userPhoneNumber'>PhoneNumber</Label>
              <Input type='number' id='userPhoneNumber' placeholder='PhoneNumber' />
              <Label className='mb-0 ms-1 mt-3' for='userpassword'>Password</Label>
              <Input id='userpassword' placeholder='Password' />
            </ModalBody>
            <ModalFooter className='px-2 px-md-5 pt-3 mt-3'>
              <Button
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                }}
                className='px-4 me-3 fw-bolder'
                color='danger'
                onClick={openAddModal}>Close</Button>
              <Button
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                }}
                className='px-4 fw-bolder me-0'
                color='primary'
                onClick={addUser}>
                {loading ?
                  <Spinner color="light">
                    Loading...
                  </Spinner> :
                  'Save'}
              </Button>
            </ModalFooter>
          </Modal>

          {/*    Edit User     */}
          <Modal isOpen={editModal} centered size='lg'>
            <ModalHeader
              className='px-2 px-md-5 fs-5'
              toggle={openEditModal}> <span className='fs-4 fw-bold'>Edit User</span> </ModalHeader>
            <ModalBody className='px-2 px-md-5'>
              <Label className='mb-0 ms-1 mt-2' for='userName'>Name</Label>
              <Input type='text' id='userName' placeholder='Name' defaultValue={user && user.name} />
              <Label className='mb-0 ms-1 mt-3' for='userPhoneNumber'>PhoneNumber</Label>
              <Input type='number' id='userPhoneNumber' placeholder='PhoneNumber' defaultValue={user && user.phoneNumber} />
              <Label className='mb-0 ms-1 mt-3' for='userpassword'>Password</Label>
              <Input id='userpassword' placeholder='Password' defaultValue={user && user.password} />
            </ModalBody>
            <ModalFooter className='px-2 px-md-5 pt-3 mt-3'>
              <Button
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                }}
                className='px-4 me-3 fw-bolder'
                color='danger'
                onClick={openEditModal}>Close</Button>
              <Button
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                }}
                className='px-4 fw-bolder me-0'
                color='primary'
                onClick={editUser}>
                {loading ?
                  <Spinner color="light">
                    Loading...
                  </Spinner> :
                  'Edit'}
              </Button>
            </ModalFooter>
          </Modal>
        </Container>
      </div>
    </>
  )
}

export default User