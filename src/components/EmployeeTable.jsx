import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { database } from "../config/app";

const EmployeeTable = ({ selectedDate }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const employeeRef = ref(database, "employees");

      await onValue(employeeRef, (snapshot) => {
        const employees = snapshot.val();
        const employeeList = [];
        for (let id in employees) {
          const employeeData = employees[id];

          for (let date in employeeData) {
            const rowData = employeeData[date];
            employeeList.push({ id, ...rowData });
          }
        }
        setData(employeeList);
        setLoading(false);
        
      });

    };
    fetchData();
  }, []);

  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "Africa/Lagos",
  };

  const columns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "email", label: "Email", minWidth: 100 },
    { id: "date", label: "Date", minWidth: 100, align: "right" },
    {
      id: "clockIn",
      label: "Clock In",
      minWidth: 100,
      align: "right",
      format: (value) => new Date(value).toLocaleTimeString("en-US", options),
    },
    {
      id: "clockOut",
      label: "Clock Out",
      minWidth: 100,
      align: "right",
      format: (value) => new Date(value).toLocaleTimeString("en-US", options),
    },
  ];

  const filteredData = data.filter(
    (employee) => employee.date === selectedDate
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Paper sx={{ width: "100%" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(selectedDate ? filteredData : data)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((key, index) => {
                    const row = selectedDate ? filteredData[key] : data[key];
                    console.log("row:", row);
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          console.log("columnId:", column.id);
                          console.log("value :", value);
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && value !== ""
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </>
  );
};

export default EmployeeTable;
