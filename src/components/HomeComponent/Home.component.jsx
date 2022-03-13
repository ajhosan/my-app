import { Container, Grid, Box, Typography } from '@mui/material';
import FotoAlex from "../../images/Foto_Alex_Img_resize.jpg";
import styles from './Home.module.css';


export default function HomeComponent(){

    const boxStyle = {
        width: "100%",
        height: 300,
        marginTop: "5%"
    }

    const styleFoto = {
        width: "80%",
        borderRadius: "30px",
        boxShadow: "10px 15px #DBAD4B"
    }

    return(
        <div>
            <Container maxWidth="xl">
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                        <Box
                            sx={ boxStyle }
                        >
                            <img src={FotoAlex} style={styleFoto} alt="Foto" />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box
                            sx={ boxStyle }
                        >  
                            <div className={styles.headingperkenalan}>
                                <div>
                                    <h1 className={styles.h1}>Hello...</h1>
                                </div>
                            </div>
                            <div className={styles.bio}>
                                <p>
                                    Nama : Alex Jhosan Abdillah <br />
                                    Umur : 23 Tahun <br />
                                    Domisili : Bogor <br />
                                    Test : Untuk Posisi Fullstack Developer <br />
                                </p>
                                <a href="https://github.com/ajhosan" target={'_blank'} style={{paddingRight: "10px"}}>
                                    <img src={'https://vocasia.id/blog/wp-content/uploads/2022/01/GitHub_pengertian.png'} alt="Logo Github" width="30" />
                                </a>
                                <a href="https://www.linkedin.com/in/alexjhosan/" target={'_blank'}>
                                    <img src={'https://cdn-icons-png.flaticon.com/512/174/174857.png'} alt="Logo LinkedIn" width="30" />
                                </a>
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}