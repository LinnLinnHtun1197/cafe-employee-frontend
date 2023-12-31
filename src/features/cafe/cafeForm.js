import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Upload } from "antd";
import { useDispatch } from "react-redux";
import { sagaActions } from "../../sagas/sagaActions";
import { useEffect } from "react";

const CafeForm = ({ data, resetData, showModal, setShowModal }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onSubmit = (values) => {
    if (!values.id || values.id === undefined) {
      dispatch({ type: sagaActions.CREATE_CAFE, payload: values });
      onReset();
    } else {
      dispatch({ type: sagaActions.UPDATE_CAFE, payload: values });
      onReset();
    }
  };

  const getFile = (e) => {
    console.log("Upload event:", e.fileList[0]);
    return e && e.fileList[0];
  };

  const onReset = () => {
    setShowModal(false);
    resetData();
  };

  return (
    <Modal
      open={showModal}
      title="Cafe Form"
      okText="Submit"
      cancelText="Cancel"
      onCancel={onReset}
      footer={[
        <Button key="cancel" onClick={onReset}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => {
            form
              .validateFields()
              .then((values) => {
                onSubmit(values);
              })
              .catch((info) => {
                console.log("Validate Failed:", info);
              });
          }}
        >
          Submit
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item label="Id" name="id" hidden></Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter name",
            },
            {
              max: 10,
              min: 6,
              message: "Name should be between 6 to 10 chars",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              max: 256,
              message: "Description is maximum 256 chars",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Logo" name="logo" getValueFromEvent={getFile}>
          <Upload
            accept="image/*"
            beforeUpload={(file) => {
              return false;
            }}
            // onChange={handleChange}
            multiple={false}
            listType="picture"
            // defaultFileList={state.fileList}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Location" name="location">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CafeForm;
