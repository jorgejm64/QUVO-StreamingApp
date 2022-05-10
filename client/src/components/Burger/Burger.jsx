import "./burger.scss";

import { bool, func } from 'prop-types';


const Burger = ({ open, setOpen }) => {

  return (
    <button className={open ? "Burger open" : "Burger closed"} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </button>
  );
};

Burger.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
};

export default Burger;