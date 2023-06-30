import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sagaActions } from "../../sagas/sagaActions";
import { selectEmployees, selectResponse } from "./employeeSlice";
import { AgGridReact } from "ag-grid-react";
import { Button, Space } from "antd";
import EmployeeForm from "./employeeForm";
import ActionBtns from "../../components/actionCellRenderer";
import { useLocation } from "react-router-dom";

const Employee = () => {
  const search = useLocation().search;
  let cafeId = new URLSearchParams(search).get("cafe_id");
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const dispatch = useDispatch();
  const response = useSelector(selectResponse);
  const employees = useSelector(selectEmployees);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState();

  const columnDefs = useMemo(
    () => [
      { headerName: "Employee ID", field: "id", flex: 1 },
      { field: "name", flex: 1 },
      { headerName: "Email Address", field: "email_address", flex: 1 },
      { headerName: "Phone Number", field: "phone_number", flex: 1 },
      {
        headerName: "Working Days",
        field: "days_worked",
        filter: true,
        flex: 1,
      },
      { headerName: "Cafe Name", field: "cafe_name", flex: 1 },
      {
        headerName: "action",
        minWidth: 150,
        cellRenderer: ActionBtns,
        cellRendererParams: (params) => {
          return {
            id: params.data.id,
            setShowModal: setShowModal,
          };
        },
        editable: false,
        colId: "action",
      },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
    }),
    []
  );

  const cellClickedListener = useCallback((event) => {
    setData(event.data);
  }, []);

  useEffect(() => {
    if (cafeId) {
      dispatch({ type: sagaActions.FETCH_CAFE_EMP, payload: cafeId });
    } else {
      dispatch({ type: sagaActions.FETCH_EMP });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Space direction="vertical" size="small" style={{ display: "flex" }}>
        {cafeId ? null : (
          <Button
            type="primary"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Add New Employee
          </Button>
        )}

        <span className={`${response ? response.status : ""}`}>
          {response ? response.message : ""}
        </span>

        <div style={{ width: "100%", height: "100%" }}>
          <div
            id="myGrid"
            style={{
              height: `${window.innerHeight}px`,
              width: "100%",
            }}
            className="ag-theme-alpine"
          >
            <AgGridReact
              ref={gridRef} // Ref for accessing Grid's API
              rowData={employees} // Row Data for Rows
              columnDefs={columnDefs} // Column Defs for Columns
              defaultColDef={defaultColDef} // Default Column Properties
              animateRows={true} // Optional - set to 'true' to have rows animate when sorted
              onCellClicked={cellClickedListener} // Optional - registering for Grid Event
            />
          </div>
        </div>
      </Space>

      {showModal && (
        <EmployeeForm
          data={data}
          resetData={setData}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};
export default Employee;
