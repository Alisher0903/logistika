import axios, { Axios } from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Button, Container, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Spinner, Table } from 'reactstrap';
import { byIdObj, url } from '../api';


const Product = () => {
  const [users, setUser] = useState([]);
  const [user, setUserObj] = useState('');
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);


  const openAddModal = () => setAddModal(!addModal)
  const openEditModal = () => setEditModal(!editModal)
  const openDeleteModal = () => setDeleteModal(!deleteModal)

  useEffect(() => {
    axios.get(`${url}user`, {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMjM0NTY3ODkiLCJpYXQiOjE3MDQ5NTgwMzIsImV4cCI6MTcwNTA0NDQzMn0.k2cl1zs8fAmYbHVSwI8peZmem0Bx_wPvXFjPPpBmykopwRtWF2zc3UcCYsqKXlXsVJ2W2QlqQbtEHM22rjx3nQ",
      }
    })
      .then(res => setUser(res.data.body))
  }, []);

  function editUser() {
    setLoading(true);
    axios.put(`${url}user/${user.id}`, {
      name: byIdObj("name").value,
      password: byIdObj("password").value,
      phonenumber: byIdObj("phonenumber")

    }).then(res => {
      toast.success("User ma'lumotlari o'zgartirildi ");
      openEditModal();
      setLoading(false);
    })
      .catch(err => toast.error("User malumoti o'zgaritilmadi! Birozdan so'ng qayta urunib ko'ring"));

  }
  function addUser() {
    setLoading(true);
    axios.post(`${url}product`, {
      name: byIdObj("name").value,
      phonenumber: byIdObj("phonenumber").value,
      password: byIdObj("password").value
    }).then(res => {
      toast.success("User qo'shildi"); openAddModal();
      openAddModal();
      setLoading(false);
    })
      .catch(err => toast.error("User ma'lumotlari to'g'ri kelmadi"));
  }
  function deleteUser() {
    setLoading(true);
    axios.delete(`${url}users/${user.id}`)
      .then(() => {
        toast.success("User o'chirildi"); openDeleteModal();
        openDeleteModal();
        setLoading(false);
      })
      .catch(() => toast.error("qayta urunib ko'ring"));
  }
  return (
    <>
    <div className='productTable'>
      <Container className='mt-5'>
        <h1 className='text-center color-white '>User List</h1>
        <Button color='primary' onClick={openAddModal}>+Add User</Button>
        <Input className='w-25 float-end' placeholder='🔍Search..' />
        <Table bordered className='mt-3 table-hover'>
          <thead className='table-dark'>
            <tr className='text-center'>
              <th>Id</th>
              <th>Name</th>
              <th>PhoneNumber</th>
              <th>Password</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((item, i) =>
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.password}</td>

                
                <td><Button color='danger' className='px-2 py-1 mt-2 ' outline onClick={() => { setUserObj(item); openEditModal() }}>Edit</Button></td>
              </tr>
            )}
          </tbody>
        </Table>
        {/*    Add User     */}
        <Modal isOpen={addModal}>
          <ModalHeader toggle={openAddModal}
          > +Add User
          </ModalHeader>
          <ModalBody>
            <Label form='userName'>Name</Label>
            <Input type='text' id='userName' placeholder='Name'>Name</Input>
            <Label form='userPhoneNumber' >PhoneNumber</Label>
            <Input type='number' id='userPhoneNumber' placeholder='PhoneNumber'>PhoneNumber</Input>
            <Label form='userpassword' >Password</Label>
            <Input type='password' id='userpassword' placeholder='Password'>Password</Input>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={addUser}>{loading ? <Spinner color="light">
              Loading...
            </Spinner> : 'Save'}</Button>
            <Button color='danger' onClick={openAddModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
        {/*    Edit User     */}
        <Modal isOpen={editModal}>
          <ModalHeader toggle={openEditModal}>Edit User</ModalHeader>
          <ModalBody>
            <Label for="name">Name</Label>
            <Input type='text' id='name' placeholder='Name' defaultValue={user && users.name}></Input>
            <Label for="phoneNumber">PhoneNumber</Label>
            <Input type='text' id='phoneNumber' placeholder='PhoneNumber' defaultValue={user && user.phoneNumber}></Input>
            <Label for="password">Password</Label>
            <Input type='text' id='password' placeholder='Password' defaultValue={user && user.password}></Input>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' className='px-4 py-2 w-20' disabled={loading} onClick={editUser}>{loading ? <Spinner color="light">
              Loading...
            </Spinner> : 'Edit'}</Button>
            <Button color='danger' onClick={openEditModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </Container>
      </div>
    </>
  )
}

export default Product