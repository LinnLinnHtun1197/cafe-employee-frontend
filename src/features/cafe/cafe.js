import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCafes, selectLoading } from "./cafeSlice";
import { sagaActions } from "../../sagas/sagaActions";
import ActionBtns from "../../components/actionCellRenderer";
import CafeForm from "./cafeForm";
import { Button, Space } from "antd";

const Cafe = () => {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const loading = useSelector(selectLoading);
  const cafes = useSelector(selectCafes);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    dispatch({ type: sagaActions.FETCH_CAFES });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // never changes, so we can use useMemo
  const columnDefs = useMemo(
    () => [
      {
        field: "logo",
        // cellRenderer: (params) =>
        //   `<img style="height: 14px; width: 14px" src=${params.data.logo} />`,
        flex: 1,
      },
      { field: "name", flex: 1 },
      { field: "description", flex: 1 },
      { field: "employees", flex: 1 },
      { field: "location", filter: true, flex: 1 },
      {
        headerName: "action",
        minWidth: 150,
        cellRenderer: ActionBtns,
        cellRendererParams: {
          // onClick: (row) => deleteRow(row.data.id),
          setShowModal: setShowModal,
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

  // const deleteRow = (rowIndex) => {
  //   console.log("rowIndex = " + rowIndex);
  //   //Perform actual delete of `rowIndex` in `this.state.data`
  // };

  return (
    <>
      <Space direction="vertical" size="small" style={{ display: "flex" }}>
        <Button
          type="primary"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Add New Cafe
        </Button>

        <div style={{ width: "100%", height: "100%" }}>
          <div
            id="myGrid"
            style={{
              height: "600px",
              width: "100%",
            }}
            className="ag-theme-alpine"
          >
            <AgGridReact
              ref={gridRef} // Ref for accessing Grid's API
              rowData={cafes} // Row Data for Rows
              columnDefs={columnDefs} // Column Defs for Columns
              defaultColDef={defaultColDef} // Default Column Properties
              animateRows={true} // Optional - set to 'true' to have rows animate when sorted
              onCellClicked={cellClickedListener} // Optional - registering for Grid Event
            />
          </div>
        </div>
      </Space>

      {showModal && (
        <CafeForm
          data={data}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};
export default Cafe;
