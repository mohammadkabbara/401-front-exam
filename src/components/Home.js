import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import {Card ,Button} from 'react-bootstrap'
class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      arrFlower:[]
    }
  }

  ////////////
  componentDidMount = async (req, res) => {
    const { user } = this.props.auth0;
    await axios.get(`http://localhost:3080/favFlowers?email=${user.email}`)
      .then((response) => {
        this.setState({
          arrFlower:response.data
        })
      })

  }

  ////////////////////////

  addFavFlower(item) {
    const { user } = this.props.auth0;
    const reqbody = {
      email: user.email,
      img: item.photo,
      name: item.name,
      desc: item.instructions,
    }
    axios.post(`http://localhost:3080/favorite`, reqbody)

  }



  render() {
    return (

      <div>

        {this.state.arrFlower.map((item) => {
          return (
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={`${item.photo}`} />
              <Card.Body>
                <Card.Title>{`${item.name}`}</Card.Title>
                <Card.Text>
                {`${item.instructions}`}
                </Card.Text>
                <Button variant="primary"
                onClick={()=>this.addFavFlower(item)}
                >Add To Favorite</Button>
              </Card.Body>
            </Card>
          )
        })

        }
      </div>
    )
      }
  }

  export default withAuth0(Home);
