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
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import NavbarLogOut from '../navbarUser';


const User = () => {
  const [users, setUser] = useState([]);
  const [user, setUserId] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [page, setPage] = useState(0);

  const openAddModal = () => setAddModal(!addModal)
  const openEditModal = () => setEditModal(!editModal)

  useEffect(() => {
    setConfig();
    getUser();
  }, []);

  // get user
  const getUser = () => {
    axios.get(`${url}user`, config)
      .then(res => {
        setUser(res.data.object);
        setPage(res.data.totalPage)
      })
      .catch(() => console.log("user kelmadi"))
  }

  const searchUser = () => {
    let searchVal = byIdObj("searchIn").value;
    if (!!searchVal) {
      axios.get(url + "user/search?data=" + searchVal, "", config)
        .then(res => setUser(res.data.body))
        .catch(() => toast.error("Siz qidirgan ma'lumot topilmadi ❌"))
    }
    else getUser();
  }

  // add user
  function addUser() {
    let roles = {
      ROLE: byIdObj("roleType").value,
    }

    let addData = {
      name: byIdObj("userName").value,
      idNumber: byIdObj("idNumber").value,
      phoneNumber: byIdObj("userPhoneNumber").value,
      password: byIdObj("userpassword").value
    }

    if (roles.ROLE === "ROLE_USER") {
      setLoading(true);
      axios.post(`${url}user?ROLE=ROLE_USER`, addData, config)
        .then(res => {
          setLoading(false);
          if (res.data.success === true) {
            toast.success("User saved✔");
            openAddModal();
            getUser();
          } else {
            toast.error(res.data.message)
          }
        })
        .catch(() => setLoading(false));
    } else if (roles.ROLE === "ROLE_ADMIN") {
      setLoading(true);
      axios.post(`${url}user?ROLE=ROLE_ADMIN`, addData, config)
        .then(res => {
          setLoading(false);
          if (res.data.success === true) {
            toast.success("Admin saved✔");
            openAddModal();
          } else toast.error(res.data.message)
        })
        .catch(() => setLoading(false))
    }
  }


  // edit user
  function editUser() {
    setLoadingEdit(true);
    let editData = {
      name: byIdObj("userName").value,
      idNumber: byIdObj("idNumber").value,
      password: byIdObj("userpassword").value,
      phoneNumber: byIdObj("userPhoneNumber").value,
    }

    axios.put(`${url}user/${user.id}`, editData, config)
      .then((res) => {
        setLoadingEdit(false);
        if (res.data.success === true) {
          toast.success("Saccessfully user edit✔");
          openEditModal();
          getUser();
        } else toast.error(res.data.message)
      })
      .catch(() => {
        toast.error("Phone number may be available❌")
        setLoadingEdit(false);
      })
  }

  const handelPageClick = (event) => {
    const pageNumber = event.selected;
    axios.get(url + "user?page=" + pageNumber + "&size=10", config).then(res => {
      setUser(res.data.object)
    });
  }

  const goProduct = () => byIdObj("goProduct").click();

  return (
    <>
      <NavbarLogOut />
      <Link to="/product" id='goProduct'></Link>
      <div className='userTable'>
        <Container>
          <h1 className='text-center text-white'>User List</h1>
          <Button

            className='addBtnClass'
            color='primary'
            onClick={openAddModal}>Add User</Button>
          <Input
            id='searchIn'
            onChange={searchUser}
            style={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
            }}
            className='w-25 float-end' placeholder='🔍Search..' />
          {/* <Button
            onClick={searchUser}
            id='inputBtn'
            className='btn-clas px-4 py-3 float-end'
            style={{


              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
            }}
          ></Button> */}
          <Table
            style={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
            }}
            bordered
            outline
            striped
            hover
            className='mt-5 tableHead'>
            <thead className='table-dark bordered tablehead'>
              <tr className='text-uppercase text-center text-success px-4 py-4'>
                <th scope='col'>Id</th>
                <th scope='col'>Name</th>
                <th scope='col'>Id Number</th>
                <th scope='col'>Phone Number</th>
                <th scope='col'>Password</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody className='text-center user-tbody'>
              {users && users.map((item, i) =>
                <tr key={item.id}>
                  <td>{i + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.idNumber}</td>
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
                        goProduct();
                        sessionStorage.setItem("userId", item.id)
                      }}>
                      Info
                    </Button>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          <div className='mb-5 mt-5'>
            <ReactPaginate className="navigation"
              breakLabel="..."
              nextLabel=">"
              onPageChange={handelPageClick}
              pageRangeDisplayed={5}
              pageCount={page}
              previousLabel="<"
              renderOnZeroPageCount={null}
              nextClassName='nextBtn'
              previousClassName='prevBtn'
            />
          </div>

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
              <Label className='mb-0 ms-1 mt-3' for='idNumber'>Id Number</Label>
              <Input type='text' id='idNumber' placeholder='Id Number' />
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
                className={`fw-bolder me-0 ${loading ? 'px-5' : 'px-4'}`}
                color='primary'
                onClick={addUser} disabled={loading}>
                {loading ?
                  <Spinner color="light" style={{ width: "21px", height: "21px" }}>
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
              <Label className='mb-0 ms-1 mt-3' for='idNumber'>Id Number</Label>
              <Input id='idNumber' placeholder='Id Number' defaultValue={user && user.idNumber} />
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
                className={`fw-bolder me-0 ${loadingEdit ? 'px-5' : 'px-4'}`}
                color='primary'
                onClick={editUser} disabled={loadingEdit}>
                {loadingEdit ?
                  <Spinner color="light" style={{ width: "21px", height: "21px" }}>
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