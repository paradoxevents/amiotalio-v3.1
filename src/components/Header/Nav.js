import React, { useEffect, useState, useRef } from "react"
import { Link } from 'gatsby'
import classnames from 'classnames'
import { FaLock } from 'react-icons/fa'
import { BiMenuAltRight } from 'react-icons/bi'

import navigation from '../../data/navigation.json'
import { useUserContext } from "../../context/UserContext"

const Nav = () => {
  const [openDrawer, toggleDrawer] = useState(false);
  const drawerRef = useRef(null);

  const { user } = useUserContext()

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
    <div className="primary-nav">
      <nav>

        <button className="mobile-toggle" onClick={() => toggleDrawer(true)}>
          <BiMenuAltRight />
        </button>

        <ul ref={drawerRef} className={
          openDrawer ? 'open-drawer' : null
        }>

          {
            // eslint-disable-next-line array-callback-return
            navigation["nav-items"].map((item, i) => {

              // eslint-disable-next-line array-callback-return
              if (!item.includeInNav) return

              if (user) {
                return (
                  <li key={i}>
                    <Link
                      onClick={() => toggleDrawer(false)}
                      to={item.path}
                      activeClassName="active"
                      className={classnames(item.renderAs === "button" ? "btn btn-small" : null)}>
                      {item.label}
                    </Link>
                  </li>
                )
              }

              if (!item.external) {
                return (
                  <li key={i} className={item.isLocked ? 'locked' : ''}>
                    <Link
                      onClick={() => toggleDrawer(false)}
                      to={!item.isLocked && item.path}
                      activeClassName="active"
                      className={classnames(item.renderAs === "button" ? "btn btn-small" : null)}>
                      {item.label}
                    </Link>
                    {item.isLocked && <span className="lock-icon"><FaLock /></span>}
                  </li>
                )
              }

              if (item.external) {
                return (
                  <li key={i} className={item.isLocked ? 'locked' : ''}>
                    <a
                      onClick={() => toggleDrawer(false)}
                      className={classnames(item.renderAs === "button" ? "btn btn-small" : null)}
                      href={!item.isLocked && item.path}
                      target="_blank"
                      rel="noopener noreferrer">
                      {item.label}
                    </a>
                    {item.isLocked && <span className="lock-icon"><FaLock /></span>}
                  </li>
                )
              }

              if (item.external) {
                return (
                  <li key={i} className={item.isLocked ? 'locked' : ''}>
                    <a
                      onClick={() => toggleDrawer(false)}
                      className={classnames(item.renderAs === "button" ? "btn btn-small" : null)}
                      href={!item.isLocked && item.path}
                      target="_blank"
                      rel="noopener noreferrer">
                      {item.label}
                    </a>
                    {item.isLocked && <span className="lock-icon"><FaLock /></span>}
                  </li>
                )
              }
            })}
        </ul>
      </nav>
    </div>
  )
}
export default Nav