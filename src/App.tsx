import { Button, Typography, Box, Grid, FormControl } from '@mui/material';

import React from 'react';
import './App.css';
import { FaUser } from 'react-icons/fa';
import data from './data.json';
import { createServer } from "miragejs"
import { Formik, Form, Field } from 'formik';


createServer({
  routes() {
    this.namespace = "api"

    this.get("/user", () => {
      return {
        customer: data
      }
    })

   
   
  },
})

interface Customer {
  Name: string;
  DOB: string;
  Email: string;
  Address: string;
  TelephoneNumber: string;
  AltTelephoneNumber: string;
}



function App() {
  const [customer, setCustomer] = React.useState<Customer>({
    Name: '',
    DOB: '',
    Email: '',
    Address: '',
    TelephoneNumber: '',
    AltTelephoneNumber: '',

  })

  React.useEffect(() => {
    fetch("api/user")
      .then((res) => res.json())
      .then((data) => setCustomer(data.customer))
      .catch((err) => console.error(err))
  }, [])
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = event.target;
    setCustomer({ ...customer, [name]: value });

  };

  return (
    <Box m={'80px auto'} p={4} boxShadow={3} sx={{ width: '80%', borderRadius: '10px' }}>
        <Formik
          initialValues={customer}
          onSubmit={async () => {
            console.log('values: ', customer);
          
          }}
        >

      <Form>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" gutterBottom>
          Customer Details
          <FaUser style={{ marginLeft: '10px' }} />
        </Typography>

        <Button
          type="submit"
          variant="outlined" color="primary" style={{ borderRadius: '30px', padding: '0px 20px' }}>
          Edit
        </Button>
      </Box>

      <Grid container spacing={2} >
        <Grid item xs={12} md={4} style={
          {
            display: 'grid',
            gap: '20px',
          }
        } >
          <FormControl>
            <label>Customer Name</label>
            <Field style={{
              backgroundColor: '#f5f5f5',
              borderRadius: '5px',
              padding: '10px',
              border: '2px solid #f5f5f5',
            }}
              value={customer?.Name}
              onChange={handleInputChange}
              name="Name"
            />
          </FormControl>
          <FormControl>

            <label>Date of Birth</label>
            <Field style={{
              backgroundColor: '#f5f5f5',
              borderRadius: '5px',
              padding: '10px',
              border: '2px solid #f5f5f5',
            }}
            type='date'
              value={customer?.DOB}
              onChange={handleInputChange}
              name="DOB"
            />
          </FormControl>
          <FormControl>
            <label>Email Address</label>
            <Field style={{
              backgroundColor: '#f5f5f5',
              borderRadius: '5px',
              padding: '10px',
              border: '2px solid #f5f5f5',
            }}
              value={customer?.Email}
              onChange={handleInputChange}
              name="Email"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} style={
          {
            display: 'grid',
            gap: '20px',
          }
        }>
          <FormControl>
            <label>Address</label>
            <Field style={{
              backgroundColor: '#f5f5f5',
              borderRadius: '5px',
              padding: '10px',
              border: '2px solid #f5f5f5',
              width: '100%',
            }}
            value={customer?.Address}
            onChange={handleInputChange}
            name="Address"
            as='textarea'
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} style={
          {
            display: 'grid',
            gap: '20px',
          }
        }>
          <FormControl>
            <label >Telephone Number</label>
            <Field style={{
              backgroundColor: '#f5f5f5',
              borderRadius: '5px',
              padding: '10px',
              border: '2px solid #f5f5f5',
            }}
              value={customer?.TelephoneNumber}
              onChange={handleInputChange}
              name="TelephoneNumber"
              type='number'
            />
          </FormControl>
          <FormControl>
            <label >Alt Telephone Number</label>
            <Field style={{
              backgroundColor: '#f5f5f5',
              borderRadius: '5px',
              padding: '10px',
              border: '2px solid #f5f5f5',
            }}
              value={customer?.AltTelephoneNumber}
              onChange={handleInputChange}
              name="AltTelephoneNumber"
              type='number'
            />
          </FormControl>
        </Grid>
      </Grid>
            </Form>
       </Formik>

   
    </Box>
  );
}

export default App;
