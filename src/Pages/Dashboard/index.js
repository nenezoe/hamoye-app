import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const MaModal = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      />
      <Button variant="primary" onClick={handleShow}>
        Set New Date
      </Button>

      <Modal show={show} onHide={handleClose}>
        {/* {handleShow(true)} */}
        <Modal.Header closeButton>
          <Modal.Title>Set New Date</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Add Begin Date</Form.Label>
              <Form.Control
                value={props.begin}
                onChange={(e) => {
                  props.setBegin(e.target.value);
                }}
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Add End Date</Form.Label>
              <Form.Control
                value={props.end}
                onChange={(e) => {
                  props.setEnd(e.target.value);
                }}
                type="text"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default function DashboardTable(props) {
  const [airport, setAirport] = useState();
  const [time, setTime] = useState();
  const [arriving, setArriving] = useState();
  const [departing, setDeparting] = useState();
  const [flights, setFlights] = useState([]);
  const [flightData, setFlightData] = useState(null);
  const [begin, setBegin] = useState("1517227200");
  const [end, setEnd] = useState("1517230800");
  const [showModal, setShowModal] = useState(false);
  const { setFlightCategories, flightCategories } = props || [];

  const getFlightsByTime = async (begin, end) => {
    try {
      const response = await fetch(
        `https://opensky-network.org/api/flights/all?begin=${begin}&end=${end}`,
        {
          method: "GET",
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      return;
    }
  };

  React.useEffect(() => {
    (async () => {
      let latestFlights = await getFlightsByTime(begin, end);
      setFlights(latestFlights);
    })();
  }, [begin, end, flights.length]);

  // {!!data&& data.map((flight,flightIndex)=>{
  // return (
  // setFlightData([...flightData,{airport: data.}])
  // )
  // })}

  // const ghghj = {
  //   icao24: "e48bb0",
  //   firstSeen: 1517227957,
  //   estDepartureAirport: "SBSP",
  //   lastSeen: 1517229087,
  //   estArrivalAirport: null,
  //   callsign: "ONE6004 ",
  //   estDepartureAirportHorizDistance: 5036,
  //   estDepartureAirportVertDistance: 493,
  //   estArrivalAirportHorizDistance: null,
  //   estArrivalAirportVertDistance: null,
  //   departureAirportCandidatesCount: 1,
  //   arrivalAirportCandidatesCount: 0,
  // };

  console.log("flights.length", flights.length);
  const THIRTY_MINUTES_IN_SECONDS = 30 * 60;
  const timeStampToNearest30Seconds = (timeStampInSeconds) => {
    return (
      Math.round(Number(timeStampInSeconds) / THIRTY_MINUTES_IN_SECONDS) *
      THIRTY_MINUTES_IN_SECONDS
    );
  };

  const newTime = (timeStampToNearest30Seconds) => {
    return new Date(timeStampToNearest30Seconds * 1000);
  };

  let airportTimeMap = {};
  flights.forEach((currentFlight) => {
    const {
      icao24,
      firstSeen,
      estDepartureAirport,
      lastSeen,
      estArrivalAirport,
      callsign,
      estDepartureAirportHorizDistance,
      estDepartureAirportVertDistance,
      estArrivalAirportHorizDistance,
      estArrivalAirportVertDistance,
      departureAirportCandidatesCount,
      arrivalAirportCandidatesCount,
    } = currentFlight || {};
    if (!!estDepartureAirport && !!firstSeen) {
      if (
        !Array.isArray(
          airportTimeMap[`${estDepartureAirport}:${newTime(firstSeen)}`]
        )
      ) {
        airportTimeMap[`${estDepartureAirport}:${newTime(firstSeen)}`] = [0, 0];
      }
      airportTimeMap[`${estDepartureAirport}:${newTime(firstSeen)}`][1] += 1;
    } else {
      console.log("estDepartureAirport", estDepartureAirport);
    }
    if (!!estArrivalAirport && !!lastSeen) {
      if (
        !Array.isArray(
          airportTimeMap[`${estArrivalAirport}:${newTime(lastSeen)}`]
        )
      ) {
        airportTimeMap[`${estArrivalAirport}:${newTime(lastSeen)}`] = [0, 0];
      }
      airportTimeMap[`${estArrivalAirport}:${newTime(lastSeen)}`][0] += 1;
    } else {
      console.log("estArrivalAirport", estArrivalAirport);
    }
  });

  const columns = [
    { id: "airport", label: "Airport", minWidth: 170 },
    { id: "time", label: "Time", minWidth: 100 },
    {
      id: "arriving",
      label: "Arriving",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "departing",
      label: "Departing",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
  ];

  const rows = Object.keys(airportTimeMap).map((currentKey) => {
    const [arriving, departing] = airportTimeMap[currentKey];
    const [airport, time] = (currentKey || "").split(":");
    // time = new Date(time)
    return { airport, time, arriving, departing };
  });

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="col-12-md col-12-sm">
      <>
        {/* <Button
          variant="primary"
          onClick={() => setShowModal(true)}
          className="mb-3">
        </Button> */}

        <MaModal
          show={showModal}
          onHide={() => setShowModal(false)}
          setEnd={setEnd}
          end={end}
          setBegin={setBegin}
          begin={begin}
          //  HandleSubmit={HandleSubmit}
        />
      </>

      <div>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          {}
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
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
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
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
}
