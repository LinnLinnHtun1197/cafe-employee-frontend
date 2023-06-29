import { Button, Space } from "antd";
import ConfirmationModal from "./confirmation";

const ActionBtns = ({ setShowModal }) => {
  return (
    <>
      <Space wrap>
        <Button
          type="primary"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Edit
        </Button>
        <Button type="primary" danger onClick={ConfirmationModal}>
          Delete
        </Button>
      </Space>
    </>
  );
};

export default ActionBtns;
