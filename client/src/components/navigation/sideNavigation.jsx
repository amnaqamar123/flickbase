import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { Box, Drawer, List, ListItemIcon, ListItemText, ListItemButton } from '@mui/material'

import HomeIcon from '@mui/icons-material/Home'
import MailIcon from '@mui/icons-material/Mail'
import DehazeIcon from '@mui/icons-material/Dehaze'
import VpnKey from '@mui/icons-material/VpnKey'
import DashboardIcon from '@mui/icons-material/Dashboard'


function SideNavigation({users,signOutUser}) {

  const [state, setState] = useState(false)


  return (
    <div>

      <DehazeIcon className='drawer_btn' onClick={() => setState(true)} style={{ cursor: 'pointer' }} />

      <Drawer
        anchor='right'
        open={state}
        onClose={() => setState(false)}
      >
        <Box sx={{ width: 250 }} role='presentation' onClick={() => setState(false)} >
          <List>
            <ListItemButton component={RouterLink} to={'/'} onClick={() => setState(false)}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary='Home' />
            </ListItemButton>

            <ListItemButton component={RouterLink} to={'/contact'} onClick={() => setState(false)}>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary='Contact' />
            </ListItemButton>

            {
              !users.auth ?

                <ListItemButton component={RouterLink} to={'/auth'} onClick={() => setState(false)}>
                  <ListItemIcon>
                    <VpnKey />
                  </ListItemIcon>
                  <ListItemText primary='SignIn' />
                </ListItemButton>

                :

                <ListItemButton onClick={() => {
                  signOutUser()
                  setState(false)
                }}>
                  <ListItemIcon>
                    <VpnKey />
                  </ListItemIcon>
                  <ListItemText primary='sign out' />
                </ListItemButton>

            }

            {
              users.auth ?
                <ListItemButton component={RouterLink} to='/dashboard' onClick={() => setState(false)}>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary='dashboard' />
                </ListItemButton>
                : null
            }
          </List>
        </Box>
      </Drawer>
    </div>
  )
}

export default SideNavigation