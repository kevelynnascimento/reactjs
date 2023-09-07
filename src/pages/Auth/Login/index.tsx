import React, { useCallback } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useFormik } from "formik";
import * as yup from 'yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import './styles.css';
import { useAuth } from '../../../contexts/Auth';
import { useNavigate } from 'react-router-dom';

interface FormValues {
    username: string;
    password: string;
}

const validationSchema = yup.object({
    username: yup
        .string()
        .required('O usuário é obrigatório.'),
    password: yup
        .string()
        .required('A senha é obrigatória.'),
});

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const formik = useFormik<FormValues>({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values: FormValues) => {
            login(values);
        },
    });

    const handleRegister = useCallback(() => {
        navigate('/cadastro');
    }, []);

    return (
        <Grid item xs={12} sm={8} md={5}>
            <Box
                sx={{
                    my: 18,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Box sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="username"
                            name="username"
                            label="Usuário"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="password"
                            name="password"
                            label="Senha"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            type="password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Entrar
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Button variant="text" onClick={handleRegister}> Não possui conta? Registre-se </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </Box>
        </Grid>
    );
};

export default Login;