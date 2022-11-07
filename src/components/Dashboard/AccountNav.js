import React, { useEffect, useState, useRef } from "react"
import { BiMenuAltRight } from 'react-icons/bi'
import { logout } from '../../utils/auth'

const Nav = () => {
  const [openDrawer, toggleDrawer] = useState(false);
  const drawerRef = useRef(null);

  const handleSingout = (e) => {
    toggleDrawer(false)
    logout()
    e.preventDefault()
  }

  useEffect(() => {
    /* Close the drawer when the user clicks outside of it */
    const closeDrawer = event => {
      if (drawerRef.current && drawerRef.current.contains(event.target)) {
        return;
      }

      toggleDrawer(false);
    };

    document.addEventListener("mousedown", closeDrawer);
    return () => document.removeEventListener("mousedown", closeDrawer);
  }, []);

  return (
    <div className="secondary-nav">
      <nav>

        <button className="mobile-toggle" onClick={() => toggleDrawer(true)}>
          <BiMenuAltRight />
        </button>

        <ul ref={drawerRef} className={
          openDrawer ? 'open-drawer' : null
        }>

          <li>
            <a
              onClick={handleSingout}
              to="#">
              Dashboard
            </a>
            <a
              onClick={handleSingout}
              to="#">
              Courses
            </a>
            <a
              onClick={handleSingout}
              to="#">
              User Account
            </a>
          </li>

        </ul>
      </nav>
    </div>
  )
}

export default Nav