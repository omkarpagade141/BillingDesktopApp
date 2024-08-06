import React from 'react';
import npprofile from '../../assets/assetsLocal/noprofile1.jpg'
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/system';
 


const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    top: 0,

    height: 45,
    justifyContent: 'center'
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
    fontFamily: theme.typography.fontFamily,
}));

const StyledNavLink = styled(Button)(({ theme }) => ({
    textDecoration: 'none',
    color: 'inherit',
    marginRight: theme.spacing(5), // Adjust spacing between links using theme spacing
}));

const NavigationBar = ({settings}) => {
    return (
        <StyledAppBar  >
            <StyledToolbar component={Container}>
                <img src={settings.business_logo} className='mr-2' alt="EasyBilling Logo" style={{height:'15px'}} />
                <StyledTypography className='mr-4' variant="h6" component="div">
                    { settings.business_name}
                </StyledTypography>
                <StyledNavLink component={NavLink} to="/dashboard" >
                    Home
                </StyledNavLink>
                <StyledNavLink component={NavLink} to="/dashboard/category">
                    Category
                </StyledNavLink>
                <StyledNavLink component={NavLink} to="/dashboard/products">
                    Products
                </StyledNavLink>
                <StyledNavLink component={NavLink} to="/dashboard/reports">
                    Reports
                </StyledNavLink>
                 <div>
                    <img src={npprofile} alt="sdfgh" style={{
                        height:'40px',
                         borderRadius:'999px'
                    }}/>
                 </div>
            </StyledToolbar>
        </StyledAppBar>
    );
}




export default NavigationBar
