import ResponsiveAppBar from "../../components/NavbarComponent/Navbar.component"
import { Container, Grid, Box, Typography } from '@mui/material';
import HomeComponent from "../../components/HomeComponent/Home.component";

export default function HomePage(){

    return(
        <div>
            <ResponsiveAppBar/>
            <Container maxWidth="xl">
                <HomeComponent />
            </Container>
        </div>
    )
}