import React, { useEffect, useState } from 'react'
import NavbarLogOut from '../navbarUser';
import { Link } from 'react-router-dom';
import { Button, Container,  Table } from 'reactstrap';
import axios from 'axios';
import { config, url } from '../api';


const About = () => {
   const [about , setAbout] = useState([]);
   
   useEffect(() => {
      getAbout();
  }, []);

   const getAbout = () => {
      
      axios.get(url +"product/user" , config)
      .then(res =>setAbout(res.data.body))
      .catch(() => console.log("about kelmadi "))
   } 
   

  return (
    <>
     <NavbarLogOut />
      <Link to="/product" id='goProduct'></Link>
      <div className='userTable'>
        <Container>
          <h1 className='text-center text-white'>Product List</h1>
           <h3 className='text-center px-2 py-3 fs-2 items-center text-dark'>Our services include a comprehensive set of activities <br /> to ensure efficient storage and supply of goods.</h3>
          <Table className='mt-5'>
            <thead className='table-dark'>
              <tr className='text-center'>
                <th>Id </th>
                <th>Id Number</th>
                <th>Name</th>
                <th>Measure Count</th>
                <th>Transport</th>
                <th>Measure</th>
                <th>Product Status</th>
                <th>Address</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody className='text-center user-tbody'>
              {about && about.map((item,i) =>
                <tr key={item.id} >
                <td >{i+1} </td>
                <td>{item.idNumber}</td>
                <td>{item.name}</td>
                <td>{item.measureCount}</td>
                <td>{item.transport}</td>
                <td>{item.measure}</td>
                <td>{item.productStatus}</td>
                <td>{item.address}</td>
                <td><Button 
                outline 
                color='info'
                className=' px-3'
                >Location</Button></td>
                </tr>
              )}
            </tbody>
          </Table>

        </Container>
      </div>
    </>
    
  )
}

export default About