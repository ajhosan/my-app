import ResponsiveAppBar from "../../components/NavbarComponent/Navbar.component"
import { Container, Grid, Box, Typography } from '@mui/material';
import MasterUserComponent from "../../components/MasterUserComponent/MasterUser.component";

export default function MasterUser(){

    return(
        <div>
            <ResponsiveAppBar/>
            <Container maxWidth="xl">
                <MasterUserComponent />
            </Container>
        </div>
    )
}