import { Button, Modal, Space } from "antd";
import { useDispatch } from "react-redux";
import { sagaActions } from "../sagas/sagaActions";

const ActionBtns = ({ setShowModal, id }) => {
  const dispatch = useDispatch();

  const onDelete = () => {
    return Modal.confirm({
      title: "Delete it?",
      content: `It will be deleted! `,
      onOk() {
        console.log("id ==> " + id);
        dispatch({
          type: sagaActions.DELETE_CAFE,
          payload: id,
        });
      },
    });
  };
  return (
    <>
      <Space wrap>
        <Button type="primary" onClick={() => setShowModal(true)}>
          Edit
        </Button>
        <Button type="primary" danger onClick={onDelete}>
          Delete
        </Button>
      </Space>
    </>
  );
};

export default ActionBtns;
