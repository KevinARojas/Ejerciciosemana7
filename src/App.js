import logo from './logo.jpg';
import './App.css';
import { Component,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2'



class App extends Component{
  state={

    desactivado:false,

    usuario:{
      nombre:"",
      contra:"",
      tarjeta:""
    },
    usuarios:[], 
    

    
  }




  guardarCambios=(e)=>{
    this.setState({ 
      ...this.state,
      usuario:{
      ...this.state.usuario,  
      [e.target.name]: e.target.value
      } 
      
    });
  }
  guardarCambios2=(e)=>{
    if (isNaN(parseFloat(e.target.value))===false)
    {
    this.setState({ 
      ...this.state,
      usuario:{
      ...this.state.usuario,  
      tarjeta: parseFloat(e.target.value)
      } 
     
    });
  }
  }

  eliminar=(id)=>{
    const temporal = this.state.usuarios.filter(a=>a.nombre!==id)


    this.setState({
      usuarios:temporal,

    })

    this.promediar(temporal);

  }
  modificar=(id)=>{
    const temporal = this.state.usuarios.find(a=>a.nombre===id);
    this.setState({
      ...this.state,
      usuario:{
        nombre:temporal.nombre,
        contra:temporal.contra,
        tarjeta:temporal.tarjeta
      },
      desactivado:true
    })
  }

  enviar=(e)=>{
    e.preventDefault();

    const {nombre,contra,tarjeta} = this.state.usuario;
      
    const vacios = (nombre.length===0 || contra.length===0 || tarjeta.length===0)

    if(!vacios){
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuario agregado',
        showConfirmButton: false,
        timer: 1500
      })
      
      let temporal = this.state.usuarios;

      if(this.state.desactivado===true){
        
       

        temporal=temporal.filter(a=>a.nombre!==nombre)
        
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario editado',
          showConfirmButton: false,
          timer: 1500
        })

        
        }
       
        
        this.setState({
          ...this.state,
          usuarios:[...temporal,this.state.usuario],
          usuario:{
            nombre:"",
            contra:"",
            tarjeta:"",
            desactivado:false,
          },
          
         
        })
          
        
      

      
      
      

    }
    else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Llena todos los campos',
        showConfirmButton: false,
        timer: 1500
      })
      return;
    }
    
  }
  
  render(){
  return (
    <div className="App">
      <header className="App-header">
      <h1>Registro de Usuarios</h1>

      </header>
      <div className="App-body">
        
      <div style={{paddingTop: "5vh"}}>
          
          <img src={logo} className="App-logo" alt="logo" />

          <Form onSubmit={this.enviar}>
            

            <Form.Group className="mb-3" controlId="formBasicusuario">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" 
                              placeholder="Nombre completo"
                              onChange={this.guardarCambios}
                              value={this.state.usuario.nombre}
                              name="nombre"
                              disabled={this.state.desactivado}
                              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicnombre">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="text" 
                              placeholder="Contraseña"
                              onChange={this.guardarCambios}
                              value={this.state.usuario.contra}
                              name="contra"
                              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCalif">
              <Form.Label>Numero de tarjeta</Form.Label>
              <Form.Control type="number" 
                              placeholder="#"
                              onChange={this.guardarCambios2}
                              value={this.state.usuario.tarjeta}
                              name="tarjeta"
                              
                              />
            </Form.Group>
            
           
            <Button variant="primary" type="submit">
              Registrar
            </Button>

            
            


          </Form>
            
         

        </div>
        <div style={{paddingTop: "5vh"}}>
          
          {this.state.usuarios.length===0
           ?
           <h1>No hay registros</h1>
           :
            <>
              
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Numero de tarjeta</th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                {
                  this.state.usuarios.map((c,i)=>
                    <tr key={i}>
                      <td>{c.nombre}</td>
                      <td>{c.tarjeta}</td>
                      
                      <td><Button onClick={()=>this.eliminar(c.nombre)} variant="danger">Eliminar</Button></td>
                      <td><Button onClick={()=>this.modificar(c.nombre)}variant="success">Modificar</Button></td>
                    </tr>
                  )
                }

                </tbody>
              </Table>
            </>
          }
        </div>
      
      </div>

      <footer className="App-footer">
      <p>Registro banco</p>

      </footer>
      
    </div>
    
  );}
}

export default App;
