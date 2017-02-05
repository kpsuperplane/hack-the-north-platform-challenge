import React, {Component} from 'react';
import { Button, Modal, ModalBody, ModalFooter, Alert, Badge, Table } from 'reactstrap';

class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true
    };
    this.hide = this.hideMethod.bind(this);
  }

  hideMethod() {
    this.setState({
      modal: false
    });
  }

  render() {
    return (
        <Modal isOpen={this.state.modal} toggle={this.hide} backdrop="static">
          <ModalBody>
            <Alert color="danger">This strength of this site lies in its slightly advanced searchbar. Please read the following.</Alert>
            <h5>Basic Search</h5>
            <p>Type in a query. It will search through <Badge>names</Badge> and <Badge>emails</Badge></p>
            <h5>Advanced Search</h5>
            <p>Use comma separated <strong>filters</strong> in the format <Badge color="primary">filter:value</Badge></p>
            <Table>
                <tr><td>Fields</td><td>name, email, company, phone, status, skill <br/><small>These fields are <em>regex</em> compatible!</small></td></tr>
                <tr><td>Sorting</td><td>Use <Badge>sort:[fieldname]</Badge> to sort by that field in ascending order. To reverse the order, prepend an exclamation mark like so: <Badge>sort:!email</Badge></td></tr>
            </Table>
            <h5>Example</h5>
            <p><code>name: Ad, skill: ios, skill: android, sort: !name</code><br/>This finds users with names including "ad" that have listed ios and android as their skills sorted by name in descending order. </p> 
            <p><code>name: Addie|Brady</code><br/>This uses Regex to find everyone named Addie or Brady.</p> 
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.hide}>Let's Go!</Button>
          </ModalFooter>
        </Modal>
    );
  }
}

export default Intro;