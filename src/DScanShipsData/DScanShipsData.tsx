import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { GroupedData } from "../helpers";

interface Props {
  groupedData: GroupedData;
}

const DScanShipsData = ({ groupedData }: Props) => (
  <TableContainer component={Paper}>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Ship Name</TableCell>
          <TableCell align="right">Ship Count</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {Object.entries(groupedData.ships).map(
          ([shipName, shipsCount], index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {shipName}
              </TableCell>
              <TableCell align="right">{shipsCount}</TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

export default DScanShipsData;
