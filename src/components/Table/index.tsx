import React from 'react';
import {
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Table as MaterialTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography
} from "@mui/material";
import "./styles.css";
import TableDataModel from './models/TableDataModel';
import TableColumnModel from './models/ColumnModel';
import TableActionModel from './models/TableActionModel';

interface Props {
  items: TableDataModel[];
  columns: TableColumnModel[];
  actions?: TableActionModel[];
}

const Table = ({ items, columns, actions }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <TableContainer sx={{ minHeight: 440, maxHeight: 600 }}>
        <MaterialTable stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {actions && (
                <TableCell
                  key=''
                  style={{ minWidth: '10' }}
                >
                  Ações
                </TableCell>
              )}
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.map((item) =>
              <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                <TableCell>
                  {actions?.map(action => (
                    <Tooltip key={action.title} title={action.title}>
                      <IconButton onClick={() => { action.click(item.id) }}>
                        {action.content}
                      </IconButton>
                    </Tooltip>
                  ))}
                </TableCell>

                {columns.map(column => (
                  <TableCell key={`${item.id}-${column.key}`}>
                    <Typography >{item[column.key]}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
        </MaterialTable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={100}
        rowsPerPage={10}
        page={0}
        onPageChange={() => { }}
        onRowsPerPageChange={() => { }}
      />
    </React.Fragment>
  );
};

export default Table;