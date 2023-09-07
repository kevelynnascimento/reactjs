import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import './styles.css';
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from 'yup';
import CompanyCreateRequest from "../../../../services/Companies/dtos/requests/CompanyCreateRequest";
import CompaniesService from "../../../../services/Companies";

interface FormValues {
  name: string;
  phoneNumber: string;
  email: string;
}

const CompaniesCreation = () => {
  const navigate = useNavigate();

  const validationSchema = yup.object({
    name: yup
      .string()
      .required('O nome é obrigatório.'),
    phoneNumber: yup
      .string()
      .min(11, 'O telefone deve conter 11 digitos')
      .required('O telefone é obrigatório.'),
    email: yup
      .string()
      .email('Insira um e-mail válido.')
      .required('O e-mail é obrigatório.'),
  });

  const create = useCallback(async (request: CompanyCreateRequest) => {
    await CompaniesService.create(request);
    navigate('/empresas');
  }, []);

  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      phoneNumber: '',
      email: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values: FormValues) => {
      create(values);
    },
  });

  return (
    <Grid container
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      sx={{ p: "2rem" }}
    >
      <Paper sx={{ width: '100%', overflow: 'hidden', padding: '50px 50px' }}>
        <Typography variant="h6" gutterBottom>
          Empresas
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Nome"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="phoneNumber"
                name="phoneNumber"
                label="Telefone"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="E-mail"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained" sx={{ padding: '10px 80px' }} type='submit'>Salvar</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

export default CompaniesCreation;
