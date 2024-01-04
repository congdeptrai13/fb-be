import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
export default function Profile() {
  const [formData, setFormData] = useState({
    userName: '',
    userImage: '',
  });
  useEffect(() => {
    setFormData({
      userName: JSON.parse(localStorage.getItem('user')).userName,
      userImage: JSON.parse(localStorage.getItem('user')).userImage,
    })
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý dữ liệu sau khi form được submit
    let payload = {
      "userName": formData.userName,
      "userImage": formData.userImage,
    };

    const requestOptions = {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    };

    fetch(`http://localhost:8080/api/userService/update/${JSON.parse(localStorage.getItem('user')).userID}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        // Handle the response data here
        localStorage.setItem('user', JSON.stringify(data));
        window.location.reload(true);
      })
      .catch(error => {
        // Handle the error here
      });

  };
  return (
    <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  <MDBCardImage src={JSON.parse(localStorage.getItem('user')).userImage}
                    alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                  {/* <MDBBtn outline color="dark" style={{ height: '36px', overflow: 'visible' }}>
                    Edit profile
                  </MDBBtn> */}
                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <MDBTypography tag="h5">{JSON.parse(localStorage.getItem('user')).userName}</MDBTypography>
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>

              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">About</p>
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>userName</Form.Label>
                        <Form.Control type="text" placeholder="userName" name='userName' value={formData.userName} onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Avatar</Form.Label>
                        <Form.Control type="text" name='userImage' onChange={handleChange} value={formData.userImage}/>
                      </Form.Group>

                      <Button variant="primary" type="submit">
                        Update Profile
                      </Button>
                    </Form>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}