import React from 'react'
import LandingPageHeader from '../components/Headers/LandingPageHeader'
import ExamplesNavbar from '../components/Navbars/ExamplesNavbar'

import { NavItem, NavLink, Nav } from 'reactstrap'


const FolderLandering = (props) => {
    return (
        <div>
            <ExamplesNavbar />
            <LandingPageHeader />
            <Nav className="flex-column">
                <NavItem>
                    <NavLink
                        className="active"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                    >
                        Active
          </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#pablo" onClick={e => e.preventDefault()}>
                        Link
          </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#pablo" onClick={e => e.preventDefault()}>
                        Link
          </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className="disabled"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                    >
                        Disabled
          </NavLink>
                </NavItem>
            </Nav>
        </div>
    )
}

export default FolderLandering