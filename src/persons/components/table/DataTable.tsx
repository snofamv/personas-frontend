import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Person } from "../../../types/Person";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface PropsDataTable {
  dataList: Person[];
}
export default function DataTable({ dataList = [] }: PropsDataTable) {
  const navigate = useNavigate();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">RUT</StyledTableCell>
            <StyledTableCell align="center">Nombre completo</StyledTableCell>
            <StyledTableCell align="center">Genero</StyledTableCell>
            <StyledTableCell align="center">Fecha nacimiento</StyledTableCell>
            <StyledTableCell align="center">Estado civil</StyledTableCell>
            <StyledTableCell align="center">Nacionalidad</StyledTableCell>
            <StyledTableCell align="center">Activo</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataList.map(
            ({
              rut,
              dv,
              id,
              nombre,
              apaterno,
              amaterno,
              fec_nac,
              estado_cv,
              nacionalidad,
              sexo,
            }: Person) => (
              <StyledTableRow key={id}>
                <StyledTableCell component="th" scope="row">
                  {`${rut}-${dv}`}
                </StyledTableCell>
                <StyledTableCell align="center">{`${nombre} ${apaterno} ${amaterno}`}</StyledTableCell>
                <StyledTableCell align="center">{`${sexo}`}</StyledTableCell>
                <StyledTableCell align="center">{`${fec_nac}`}</StyledTableCell>
                <StyledTableCell align="center">{`${estado_cv}`}</StyledTableCell>
                <StyledTableCell align="center">{`${nacionalidad}`}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button onClick={() => navigate(`/search/${rut}`)}>
                    Editar
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
