import * as React from 'react';
import Axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import { useForm, Controller } from "react-hook-form";

export default function FormRole() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { handleSubmit, reset, formState: { errors }, control } = useForm({
    defaultValues: {
        namaRole: ''
    }
  });
    const onSubmit = data => {
        const dataJSON = JSON.stringify(data);
        Axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/userrole/create`,
            data: dataJSON,
            headers: {"Content-Type": "application/json"}
          })
          .then(function (response) {
            console.log(response.data);
            alert(response.data.message)
            setOpen(false)
            reset({
                namaRole: ""
            });
          })
          .catch(function (error) {
            alert(error.response.data.message);
            setOpen(false)
            reset({
                namaRole: ""
            });
        });
    };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Role User
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Role User</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
                <label htmlFor="label">Role Name</label>
                <Controller
                name="namaRole"
                control={control}
                rules={{ required: true }}
                render={({ field }) => 
                <Input {...field} type="text" style={{width:"100%"}} placeholder="Nama Role" />
                }
                />
                {
                errors.namaRole?.type === 'required' && <Typography sx={{color:"red"}} component="div" gutterBottom>Required</Typography>
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