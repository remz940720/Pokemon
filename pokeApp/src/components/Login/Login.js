import React, {Component} from 'react'
import './Login.css';
import 'bootstrap/dist/css/bootstrap.css'
import { Form} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';

const baseUrl = "http://localhost:3001/usuarios";
const cookies = new Cookies();

class Login extends Component {
  state ={
    form:{
      email: '',
      password: ''
    }
  }

  handleChange = async e =>{
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    //console.log(this.state.form);
  }

  iniciarSesion = async ()=>{
    await axios.get(baseUrl, {params: {username : this.state.form.username, password: md5(this.state.form.password)}})
    .then(response => {
      return response.data;
    })
    .then( response =>{
      if(response.length>0){
        let respuesta = response[0];
        cookies.set('id', respuesta.id, {path: "/"})
        cookies.set('nombre', respuesta.nombre, {path: "/"})
        cookies.set('apellido', respuesta.apellido, {path: "/"})
        cookies.set('username', respuesta.username, {path: "/"})
        cookies.set('email', respuesta.email, {path: "/"})
        alert(`Bienvenido ${respuesta.username}`);
        window.location.href= "./menu";
      }else{
        alert('El usuario o la contraseña no son correctos');
      }
    })
    .catch(err=>{
      console.log(err);
    })
  }

  componentDidMount() {
    if(cookies.get('username')){
      window.location.href = './menu';
    }
  }

  render(){

    return (
      <div className="contenedor-login">
        <Form className='login-form'>
          <div className='titulo'>
            <h1 className='text-center'>
              <span>Poke App</span> 
            </h1>
          </div>
          <hr></hr>
          <Form.Group>
            <Form.Label>Correo:</Form.Label>
            <Form.Control name='email' onChange={this.handleChange} type="text" placeholder="Enter email" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Contraseña:</Form.Label>
            <Form.Control name='password' onChange={this.handleChange} type="password" placeholder="Enter password" />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button onClick={()=>{this.iniciarSesion()}} className='log-Boton' variant='warning' size='lg'>Log in</Button>
          </div>
        </Form>
      
      </div>
    )
  }
}

export default Login;