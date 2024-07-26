import styled from "styled-components";
import { useDeleteCabin } from "./useDeleteCabin";

import CreateCabinForm from "./CreateCabinForm";
import { HiPencil, HiTrash } from "react-icons/hi";
import { HiSquare2Stack } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

// import { HiPencil, HiTrash, HiSquare2Stack } from 'react-icons/hi2';

// import Menus from 'ui/Menus';
// import Modal from 'ui/Modal';
// import ConfirmDelete from 'ui/ConfirmDelete';
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// import { formatCurrency } from "../../utils/helpers";
// import { useDeleteCabin } from './useDeleteCabin';
// import { useCreateCabin } from './useCreateCabin';
// import CreateCabinForm from './CreateCabinForm';

// v1
// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  /* transform: scale(1.66666) translateX(-2px); */
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { createCabin, isCreatingCabin } = useCreateCabin();
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const {
    name,
    maxCapacity,
    discount,
    image,
    id: cabinId,
    regularPrice,
    description,
  } = cabin;

  function handleDublicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      discount,
      image,
      regularPrice,
      description,
    });
  }
  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>${regularPrice}.00</Price>
      {/* <Discount>{formatCurrency(discount)}</Discount> */}
      {discount ? <Discount>${discount}.00</Discount> : <span>&mdash;</span>}
      <div>
        {/* <button onClick={handleDublicate}>
          <HiSquare2Stack />
        </button> */}
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />

            <Menus.List id={cabinId}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDublicate}>
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resource="cabin"
                onConfirm={() => deleteCabin(cabinId)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
