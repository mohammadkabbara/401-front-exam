import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import {Card ,Button} from 'react-bootstrap'
import UpdateForm from './UpdateForm'
class FavFlowers extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      favFlower:[],
      show: false,
      email:this.props.auth0.user.name,
    }
  }

componentDidMount = async (req , res )=>{
  await axios.get(`http://localhost:3080/favorite?email=${this.state.email}`)
  .then((response)=>{
    this.setState({
      favFlower:response.data
    })
  })

}
//////////////

deleteFavFlower=async (index) =>{
  const { user } = this.props.auth0;
  await axios.delete(`http://localhost:3080/favorite/${index}?email=${user.email}`)
  .then((response) =>{
    this.setState({
      favFlower:response.data
    })
  })
}

///////////////////////
handleShow=(a , b ,c ,d)=>{
  this.setState({
name:b,
img:c,
desc:d,
show:true
  })

}
 ////////////
 handleClose=() =>{
   this.setState({
     show:false,

   })
 }
////////////
updateData = async (e)=>{
  e.preventDefault();
  let updateObj={
    email:this.props.auth0.user.name,
    name:e.target.value.name,
    img:e.target.value.img,
    desc:e.target.value.desc
  }
  let response=await axios.put(`http://localhost:3080/favorite/${this.state.index}`,updateObj)
  
}

  render() {
    return(
      <>
        <div>
        {this.state.favFlower.map((item,index) => {
          return (
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={`${item.img}`} />
              <Card.Body>
                <Card.Title>{`${item.name}`}</Card.Title>
                <Card.Text>
                {`${item.desc}`}
                </Card.Text>
                <Button variant="primary"
                onClick={()=>this.deleteFavFlower(index)}
                >delete</Button>

                 <Button variant="primary"
                onClick={()=>this.handleShow(index ,item.name,item.img,item.desc )}
                >Add To Favorite</Button>
              </Card.Body>
            </Card>
          )
        })

        }
        {
          <UpdateForm
          handleShow={this.handleShow}
          handleClose={this.handleClose}
          img={this.state.img}
          name={this.state.name}
          desc={this.state.desc}
          updateData={this.updateData}
          index={this.state.index}
          
          />
        }

        </div>
      </>
    )
  }
}

export default withAuth0 (FavFlowers);
