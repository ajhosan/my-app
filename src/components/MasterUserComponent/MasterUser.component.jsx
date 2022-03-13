import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { visuallyHidden } from '@mui/utils';
import FormRole from '../FormRole/FormRole.component';
import FormUserMaster from '../FormUserMaster/FormUserMaster.component';
import Axios from 'axios';
// import { DeleteComponent } from './DeleteButton.component';
import { Button, IconButton, ListItem, ListItemText } from "@mui/material"
import { Delete } from '@mui/icons-material'
import FindPlayer from '../FindPlayer/FindPlayer';
import ListPlayers from '../ListPlayer/SearchPlayerList';

function createData(idUser, userName, userJenisKelamin, userAlamat, userEmail, userRoleId, action) {
  return {
    idUser,
    userName,
    userJenisKelamin,
    userAlamat,
    userEmail,
    userRoleId,
    action
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  
  const stabilizedThis = array.map((el, index) => [el, index]);
  // console.log("bung", stabilizedThis)
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'userName',
    numeric: false,
    disablePadding: true,
    label: 'Nama',
  },
  {
    id: 'userJenisKelamin',
    numeric: false,
    disablePadding: true,
    label: 'Jenis Kelamin',
  },
  {
    id: 'userAlamat',
    numeric: true,
    disablePadding: false,
    label: 'Alamat',
  },
  {
    id: 'userEmail',
    numeric: true,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'userRoleId',
    numeric: true,
    disablePadding: false,
    label: 'Role',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Table User
        </Typography>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function MasterUserComponent() {

  
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('jenis_kelamin');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // GET DATA
  const [playerData, setUserMaster] = React.useState([]);

  React.useEffect(()=>{
    const fetchData = async () =>{
       const dataFetch =  await Axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/usermaster/get/all`,
        responseType: 'JSON'
      });

      const datatetap = await dataFetch.data.data;
      setUserMaster(datatetap)
    }
    fetchData()
}, [])

// Delete Data
const onDelete = async (id) => {
  await Axios.delete(`${process.env.REACT_APP_API_URL}/usermaster/delete/${id}`)
  .then(function (response) {
    console.log(response.data);
    alert(response.data.message)
  })
  .catch(function (error) {
    alert(error.response.data.message);
  })

  const dataFetch =  await Axios({
    method: 'get',
    url: `${process.env.REACT_APP_API_URL}/usermaster/get/all`,
    responseType: 'JSON'
  });

  const datatetap = await dataFetch.data.data;
  setUserMaster(datatetap)
}

  let dataPlayer = [createData(playerData)];
  let dataPlayerConcat = dataPlayer.concat();
  let datafix = dataPlayerConcat[0].idUser;
  let rows = datafix

  // Search Data
  const [searching, setSearching] = React.useState(false);
  const [dataSearch, setDataSearch] = React.useState([]);
  const searchPlayer = (search) => {
    setSearching(true)
    let playerTemp = playerData
    let playerFinal = playerTemp.filter((data) => {
      if (
        data.userName.toLowerCase().includes(search) || 
        data.userAlamat.toLowerCase().includes(search) ||
        data.userEmail.toString().includes(search) ||
        data.userJenisKelamin.toString().includes(search) ||
        data.userRoleId.toString().includes(search)
      ) {
        // console.log(el);
        return data;
      }
    })
    setDataSearch(playerFinal)
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.nama);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, nama) => {
    const selectedIndex = selected.indexOf(nama);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, nama);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  const isSelected = (nama) => selected.indexOf(nama) !== -1;

  const rowsResult = dataPlayerConcat[0].idUser
  let lengthRows = 0
  if(typeof rowsResult.length !== undefined){ 
    lengthRows = rowsResult.length
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - lengthRows) : 0;

    const boxStyle = {
        width: "100%",
        height: 300,
        marginTop: "5%"
    }

  
  
  return (
    <div style={boxStyle}>
        <h1>Table Master User</h1>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={0}>
            <FormRole />  
          </Grid>
          <Grid item xs={0}>
            <FormUserMaster />
          </Grid>
        </Grid>
        {searching ? (
            <div>
              <FindPlayer
                setSearching={setSearching}
                searchData={dataSearch}
                onSearchPlayer={searchPlayer}
              />
              <ListPlayers playerData={playerData} searchData={dataSearch} />
            </div>
          ) : (
            <div>
              <FindPlayer
                setSearching={setSearching}
                searchData={dataSearch}
                onSearchPlayer={searchPlayer}
              />
              
              <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
            <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
            >
                <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={lengthRows}
                />
                
                <TableBody>

                {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                    const isItemSelected = isSelected(row.userName);
                    // const labelId = `enhanced-table-checkbox-${index}`;
                    // console.log("IDnya", row.idUser)
                    return (
                        <TableRow
                        hover
                        // onClick={(event) => handleClick(event, row.userName)}
                        // role="checkbox"
                        // aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.userName}
                        // selected={isItemSelected}
                        >
                        {/* <TableCell padding="checkbox">
                            <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            // inputProps={{
                            //     'aria-labelledby': labelId,
                            // }}
                            />
                        </TableCell> */}
                        <TableCell
                            component="th"
                            // id={labelId}
                            scope="row"
                            padding="none"
                        >
                            {row.userName}
                        </TableCell>
                        <TableCell align="right">{row.userJenisKelamin}</TableCell>
                        <TableCell align="right">{row.userAlamat}</TableCell>
                        <TableCell align="right">{row.userEmail}</TableCell>
                        <TableCell align="right">{row.userRoleId}</TableCell>
                        <TableCell align="right">
                        <IconButton aria-label="delete" onClick={() => onDelete(row.idUser)} color="error" >
                            <Delete fontSize="small"/>
                        </IconButton>
                        </TableCell>
                        </TableRow>
                    );
                    })}
                {emptyRows > 0 && (
                    <TableRow
                    style={{
                        height: (dense ? 33 : 53) * emptyRows,
                    }}
                    >
                    <TableCell colSpan={6} />
                    </TableRow>
                )}
                </TableBody>
            </Table>
            </TableContainer>
            <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={lengthRows}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
        </Box>
            </div>
          )}
    </div>
  );
}