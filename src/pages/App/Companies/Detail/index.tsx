import React, { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.css";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from 'yup';
import CompaniesService from "../../../../services/Companies";

interface LocationState {
  id: string;
};

interface FormValues {
  name: string;
  phoneNumber: string;
  email: string;
}

const CompaniesDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state as LocationState;

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

  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      phoneNumber: '',
      email: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values: FormValues) => { },
  });

  const findById = useCallback(async () => {
    const response = await CompaniesService.findById(id);
    formik.setValues({
      name: response.name,
      phoneNumber: response.phoneNumber,
      email: ''
    })
  }, [id]);

  useEffect(() => {
    if (id)
      findById();
  }, [findById]);

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
                disabled
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
                disabled
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
                disabled
              />
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

export default CompaniesDetail;
