// import React, { useState } from 'react';
// import { BuyButton } from './bannerCss';
// import { Button } from 'react-bootstrap';
// import Modal from 'react-bootstrap/Modal';
// import styled from 'styled-components';
// const ModalInputContainer = styled.div`
//   display: flex;
//   flex-direction: column;
// `;
// const ModalInput = styled.input`
//   margin: 5px 0px;
// `;
// function Sample() {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   return (
//     <>
//       <BuyButton onClick={handleShow}>추가하기</BuyButton>
//       <Modal
//         show={show}
//         onHide={handleClose}
//         backdrop="static"
//         keyboard={false}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>아이템 추가</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <ModalInputContainer>
//             <ModalInput></ModalInput>
//             <ModalInput></ModalInput>
//             <ModalInput></ModalInput>
//             <ModalInput></ModalInput>
//           </ModalInputContainer>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary">Understood</Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// export default Sample;
