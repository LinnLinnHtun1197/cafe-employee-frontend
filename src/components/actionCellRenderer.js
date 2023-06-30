import { Button, Modal, Space } from "antd";
import { useDispatch } from "react-redux";

const ActionBtns = ({ id, type, setShowModal }) => {
  const dispatch = useDispatch();

  const onDelete = () => {
    return Modal.confirm({
      title: "Delete it?",
      content: `It will be deleted! `,
      onOk() {
        dispatch({
          type,
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
