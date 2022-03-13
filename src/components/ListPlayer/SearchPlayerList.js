import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {IconButton} from '@mui/material';
import { Delete, Edit} from '@mui/icons-material';

// argumen props -> menangkap perubahan/value yang terjadi di web/app.js 
const ListPlayers = (props) => (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nama Lengkap</TableCell>
            <TableCell>Jenis Kelamin</TableCell>
            <TableCell>Alamat</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.searchData.map((player) => (
            <TableRow
              key={player.userId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {player.userName}
              </TableCell>
              <TableCell>{player.userJenisKelamin}</TableCell>
              <TableCell>{player.userAlamat}</TableCell>
              <TableCell>{player.userEmail}</TableCell>
              <TableCell>{player.userRoleId}</TableCell>
              {/* <TableCell>
                    <IconButton 
                        aria-label="Edit" 
                        onClick={() => {
                            props.onEditPlayer(player)
                        }} 
                        color="primary">
                
                        <Edit fontSize="small"/>
                    </IconButton>
                <IconButton 
                    aria-label="delete" 
                    onClick={() => { if (window.confirm('Are you sure you wish to delete this player?')) props.onDeletePlayer(player.id)}} color="error" >
                    <Delete fontSize="small"/>
                </IconButton>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
)

export default ListPlayers