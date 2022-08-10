import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

export default function EditUser() {
  const navigate = useNavigate();

  const { id } = useParams()

  const [active, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null)
  const [validationError,setValidationError] = useState({})

  useEffect(()=>{
    fetchProduct()
  },[])

  const fetchProduct = async () => {
    await axios.get(`http://localhost:8000/api/lists/${id}`).then(({data})=>{
      const { description, active } = data.list[0]
      setDescription(description)
      setTitle(active)
    }).catch(({response:{data}})=>{
      Swal.fire({
        text:data.message,
        icon:"error"
      })
    })
  }

  const changeHandler = (event) => {
		setImage(event.target.files[0]);
	};

  const UpdateItem = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append('_method', 'PATCH');
    formData.append('description', description)
    formData.append('active', active)


    await axios.post(`http://localhost:8000/api/lists/${id}`, formData).then(({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })
      navigate("/")
    }).catch(({response})=>{
      if(response.status===422){
        setValidationError(response.data.errors)
      }else{
        Swal.fire({
          text:response.data.message,
          icon:"error"
        })
      }
    })
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Update Item</h4>
              <hr />
              <div className="form-wrapper">
                {
                  Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {
                              Object.entries(validationError).map(([key, value])=>(
                                <li key={key}>{value}</li>   
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                }
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
