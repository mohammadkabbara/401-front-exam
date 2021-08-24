import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form ,Modal,Button} from 'react-bootstrap';

class UpdateForm extends React.Component {
    render() {
        return (

            <div>


                <Modal show = {this.props.show}  onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                    <Form onSubmit={(e)=>this.props.updateData(e)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>
                              name
                            </Form.Label>
                            <Form.Control type ='text' defaultValue={this.props.name} name='name'/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>
                              photo
                            </Form.Label>
                            <Form.Control type ='text' defaultValue={this.props.img} name='img'/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>
                              description
                            </Form.Label>
                            <Form.Control type ='text' defaultValue={this.props.desc} name='desc'/>
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={this.props.handleClose}>
                            Submit
                        </Button>
                        </Form>
                    </Modal.Body>
                   

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}>Close</Button>
                       
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default UpdateForm;



















