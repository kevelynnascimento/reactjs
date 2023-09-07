import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Grid,
  Paper
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import "./styles.css";
import CompanyFilterResponse from '../../../../services/Companies/dtos/responses/CompanyFilterResponse';
import CompaniesService from '../../../../services/Companies';
import TableColumnModel from '../../../../components/Table/models/ColumnModel';
import Table from '../../../../components/Table';
import ConfirmDialog from '../../../../components/ConfirmDialog';

const CompaniesListing = () => {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState<CompanyFilterResponse[]>(null);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>(null);

  const find = useCallback(async () => {
    const response = await CompaniesService.filter();
    setCompanies(response);
  }, []);

  const handleEditionCompany = useCallback((id: string) => {
    navigate('/empresas/edicao', { state: { id } });
  }, []);

  const handleDeleteCompany = useCallback((id: string) => {
    setSelectedId(id);
    setConfirmOpen(true);
  }, []);

  const handleDetailCompany = useCallback((id: string) => {
    navigate('/empresas/detalhe', { state: { id } });
  }, []);

  const disable = useCallback(async () => {
    await CompaniesService.disable(selectedId);
  }, [selectedId]);

  const columns: TableColumnModel[] = [
    { key: 'name', label: 'Nome', minWidth: 10 },
    { key: 'phoneNumber', label: 'Telefone', minWidth: 10 }
  ];

  const actions = [
    {
      title: 'Detalhar',
      click: handleDetailCompany,
      content: <VisibilityIcon />
    },
    {
      title: 'Editar',
      click: handleEditionCompany,
      content: <EditIcon />
    },
    {
      title: 'Excluir',
      click: handleDeleteCompany,
      content: <DeleteIcon />
    }
  ];

  useEffect(() => {
    find();
  }, [find]);

  return (
    <React.Fragment>
      <Grid container
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        sx={{ p: "2rem" }}
      >
        <Grid container spacing={2} sx={{ paddingBottom: '20px' }} >
          <Grid item xs={12} sx={{ paddingTop: '50px', display: 'flex', justifyContent: 'right' }}>
            <Button
              variant="contained"
              sx={{ padding: '10px 10px' }}
              onClick={() => {
                navigate('/empresas/criacao')
              }}>Cadastrar</Button>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ pt: "2rem" }}>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            {companies && <Table items={companies} columns={columns} actions={actions}></Table>}
          </Paper>
        </Grid>
      </Grid>
      <ConfirmDialog
        title="Exclusão de empresa"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={disable}
      >
        Você tem certeza que deseja excluir esta empresa?
      </ConfirmDialog>
    </React.Fragment>
  );
};

export default CompaniesListing;