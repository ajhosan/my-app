import * as React from 'react';
import Axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import {Input, Select, MenuItem, InputLabel, FormControl} from '@mui/material';
import DialogContentText from '@mui/material/DialogContentText';
// import {  } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";

export default function FormUserMaster() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { handleSubmit, reset, formState: { errors }, control } = useForm({
    defaultValues: {
        userName: '',
        userEmail: '',
        userJenisKelamin: '',
        userAlamat: '',
        userRoleId: ''
    }
  });
  
  function ResetParam() {
    return(
      reset({
        userName: '',
        userEmail: '',
        userJenisKelamin: '',
        userAlamat: '',
        userRoleId: ''
      })
    )
    
  }
    const onSubmit = async (data) => {
        const dataJSON = JSON.stringify(data);
        await Axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/usermaster/create`,
            data: dataJSON,
            headers: {"Content-Type": "application/json"}
          })
          .then(function (response) {
            alert(response.data.message)
            setOpen(false)
            ResetParam()
          })
          .catch(function (error) {
            alert(error.response.data.message);
            setOpen(false)
            ResetParam()
        });
    };

    const [playerRole, setplayerRole] = React.useState([]);

    React.useEffect(()=>{
        const fetchData = async () =>{
          const dataFetch =  await Axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/userrole/get/all`,
            responseType: 'JSON'
          });

          const datatetap = await dataFetch.data.data;
          setplayerRole(datatetap)
        }
        fetchData()
    }, [])

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Master User
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Master User</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
                <DialogContentText>
                To add account to this website, please enter submit here. We
                will send updates occasionally.
                </DialogContentText>
                <br />
                <label htmlFor="label">Nama Lengkap</label>
                <Controller
                    name="userName"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => 
                        <Input {...field} type="text" style={{width:"100%", marginBottom: "5%"}} placeholder="Nama Lengkap" />
                    }
                />
                {
                    errors.userName?.type === 'required' && <Typography sx={{color:"red"}} component="div" gutterBottom>Required</Typography>
                }

                <label htmlFor="label">Email</label>
                    <Controller
                    name="userEmail"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => 
                        <Input {...field} type="email" style={{width:"100%", marginBottom: "5%"}} placeholder="Email" />
                    }
                />
                {
                    errors.userEmail?.type === 'required' && <Typography sx={{color:"red"}} component="div" gutterBottom>Required</Typography>
                }

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Pilih Jenis Kelamin</InputLabel>
                    <Controller
                    name="userJenisKelamin"
                    
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => 
                    <Select 
                        {...field}
                        label="Pilih Jenis Kelamin"
                        id="demo-simple-select"
                        labelId="demo-simple-select-label"
                        style={{marginBottom: "5%"}}
                    >
                        <MenuItem value={"Laki-laki"}>Laki-laki</MenuItem>
                        <MenuItem value={"Perempuan"}>Perempuan</MenuItem>
                    </Select>
               
                    }
                    />
                 </FormControl>
                {
                errors.userJenisKelamin?.type === 'required' && <Typography sx={{color:"red"}} component="div" gutterBottom>Required</Typography>
                }

                <label htmlFor="label">Alamat</label>
                    <Controller
                    name="userAlamat"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => 
                        <Input {...field} type="text" style={{width:"100%", marginBottom: "5%"}} placeholder="Email" />
                    }
                />
                {
                    errors.userAlamat?.type === 'required' && <Typography sx={{color:"red"}} component="div" gutterBottom>Required</Typography>
                }

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Pilih Role Id</InputLabel>
                    <Controller
                    name="userRoleId"
                    
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => 
                    <Select 
                        {...field}
                        label="Pilih Jenis Kelamin"
                        id="demo-simple-select"
                        labelId="demo-simple-select-label"
                        style={{marginBottom: "5%"}}
                    >
                      <MenuItem value={""}>Pilih Role</MenuItem>
                      {playerRole.map((data) => {
                        return <MenuItem key={data.idRole} value={`${data.idRole}`}>{data.namaRole}</MenuItem>
                      })}
                        
                    </Select>
               
                    }
                    />
                 </FormControl>
                {
                errors.userRoleId?.type === 'required' && <Typography sx={{color:"red"}} component="div" gutterBottom>Required</Typography>
                }
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{my:2}}>Submit</Button>
            </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}