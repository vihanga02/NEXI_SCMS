import React from 'react';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import './Sidebar.css';
import classNames from 'classnames';

function Sidebar({ activePanel }) {  
  console.log(activePanel)
  return (
      <Row>
        <Col sm={12}>
          <ListGroup className='listitem'>
            <ListGroup.Item action href="/driver" className={classNames({'selected': activePanel === 0 })}>
              Driver
            </ListGroup.Item>
            <ListGroup.Item action href="/order" className={classNames({'selected': activePanel === 1 })}>
              Order
            </ListGroup.Item>
            <ListGroup.Item action href="/report" className={classNames({'selected': activePanel === 2 })}>
              Report
            </ListGroup.Item>
            <ListGroup.Item action href="/assistant" className={classNames({'selected': activePanel === 3 })}>
              Assistant
            </ListGroup.Item>
            <ListGroup.Item action href="/driver" className={classNames({'selected': activePanel === 4 })}>
              Link 5
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
  );
}

export default Sidebar;
