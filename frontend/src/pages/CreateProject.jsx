import { Form, Stack, Button, Row, Col } from 'react-bootstrap';

const CreateProject = () => {

    return (
        <div className="col-md-5 mx-auto">
            <h3>Create Project</h3>
            <Stack gap={2}>
                <Form >
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm={2} >Name</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Enter project name..." />
                        </Col>

                        <Form.Label column sm={2} >Description</Form.Label>
                        <Col>
                            <Form.Control type="textarea" placeholder="Enter project description..." />
                        </Col>

                    </Form.Group>
                    <Stack gap={2} className="col-md-5 mx-auto">
                        <Button variant="secondary">Save changes</Button>
                        <Button variant="outline-secondary">Cancel</Button>
                    </Stack>
                </Form>
            </Stack>
        </div>
    )

}

export default CreateProject;