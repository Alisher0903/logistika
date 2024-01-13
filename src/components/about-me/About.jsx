import React, { useEffect, useState } from 'react'
import NavbarLogOut from '../navbarUser';
import {
  Button,
  Container,
  Input,
  InputGroup,
  InputGroupText,
  Modal,
  ModalBody,
  ModalHeader,
  Table
} from 'reactstrap';
import axios from 'axios';
import { config, setConfig, url } from '../api';
import LocationE from '../location/Location';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';

const About = () => {
  const [about, setAbout] = useState([]);
  const [aboutId, setAboutId] = useState([]);
  const [modal, setModal] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setConfig();
    getAbout();
  }, []);

  const openModal = () => setModal(!modal)

  const getAbout = () => {
    axios.get(url + "product/user", config)
      .then(res => {
        setAbout(res.data.object)
        setTotalPage(res.data.totalPage)
      })
      .catch(() => console.log("about kelmadi"))
  }

  const handelPageClick = (event) => {
    const pageNumber = event.selected;
    setCurrentPage(pageNumber)
    axios.get(url + "product/user?page=" + pageNumber + "&size=10", config)
      .then(res => setAbout(res.data.object));
  }

  // search
  const searchPro = () => {
    let searchV = document.getElementById("userSearch").value
    if (!!searchV) {
      axios.get(url + "product/user/search?data=" + searchV, config)
        .then(res => {
          if (res.data.success === true) setAbout(res.data.body)
          if (res.data.success === false) {
            setAbout("");
            toast.error("The information you were looking for was not found❌")
          }
        })
        .catch(() => console.log("topilmadi"))
    } else getAbout();
  }

  const enterSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.getElementById("inputBtn").click();
    }
  }

  return (
    <>
      <NavbarLogOut />
      <div className='userTable'>
        <Container>
          <h1 className='text-center text-white'>Product List</h1>
          <h3 className='text-center px-0 px-sm-2 py-3 fs-2 items-center text-dark'>
            Our services include a comprehensive set of activities
            <br className='d-none d-md-inline' /> to ensure efficient storage and supply of goods.
          </h3>
          <div className='w-100 mt-4 d-flex justify-content-end align-items-center'>
            <InputGroup className='admin-search'>
              <Input placeholder='Search' onKeyDown={enterSearch} id='userSearch' />
              <InputGroupText onClick={searchPro} id='inputBtn' style={{ cursor: "pointer" }}>🔎</InputGroupText>
            </InputGroup>
          </div>
          <Table
            hover
            outline
            striped
            responsive
            className='mt-4'>
            <thead className='table-dark'>
              <tr className='text-center'>
                <th>№</th>
                <th>Name</th>
                <th>Id Number</th>
                <th>Measure</th>
                <th>Measure Count</th>
                <th>Transport</th>
                <th>Product Status</th>
                <th>Address</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody className='text-center user-tbody'>
              {about && about.map((item, i) =>
                <tr key={item.id} >
                  <td>{(currentPage * 10) + (i + 1)}</td>
                  <td>{item.name}</td>
                  <td>{item.idNumber}</td>
                  <td>{item.measure}</td>
                  <td>{item.measureCount}</td>
                  <td>{item.transport}</td>
                  <td>{item.productStatus}</td>
                  <td>{item.address}</td>
                  <td>
                    <Button
                      onClick={() => {
                        openModal();
                        setAboutId(item);
                      }}
                      outline
                      color='info'
                      className=' px-3'>Location</Button>
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
              pageCount={totalPage}
              previousLabel="<"
              renderOnZeroPageCount={null}
              nextClassName='nextBtn'
              previousClassName='prevBtn'
            />
          </div>
        </Container>

        {/* location */}
        <Modal isOpen={modal} fullscreen>
          <ModalHeader toggle={openModal}><span className='fw-bold fs-4'>Product Location</span></ModalHeader>
          <ModalBody>
            <LocationE latitude={aboutId.latitude} longitude={aboutId.longitude} />
          </ModalBody>
        </Modal>
      </div>
    </>

  )
}

export default About