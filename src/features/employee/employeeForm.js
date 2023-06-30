import { Button, Form, Input, Modal, Radio, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { sagaActions } from "../../sagas/sagaActions";
import { useEffect } from "react";
import { selectCafes } from "../cafe/cafeSlice";

const EmployeeForm = ({ data, resetData, showModal, setShowModal }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const cafes = useSelector(selectCafes);
  const cafeConvertedData = cafes.map((item) => ({
    value: item.id,
    label: item.name + (item.location ? " (" + item.location + ")" : ""),
  }));

  useEffect(() => {
    dispatch({ type: sagaActions.FETCH_CAFES });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onSubmit = (values) => {
    if (!values.id || values.id === undefined) {
      dispatch({ type: sagaActions.CREATE_EMP, payload: values });
      onReset();
    } else {
      dispatch({ type: sagaActions.UPDATE_EMP, payload: values });
      onReset();
    }
  };

  const onReset = () => {
    setShowModal(false);
    resetData();
  };

  return (
    <Modal
      open={showModal}
      title="Employee Form"
      okText="Submit"
      cancelText="Cancel"
      onCancel={onReset}
      autoComplete="off"
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
        initialValues={{}}
      >
        <Form.Item label="Id" name="id" hidden></Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter employee name",
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
          name="email_address"
          label="Email address"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone_number"
          label="Phone Number"
          rules={[
            {
              pattern: new RegExp(/(6|8|9)\d{7}$/),
              message: "Please enter correct phone number!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="gender" label="Gender">
          <Radio.Group>
            <Radio value="Male"> Male </Radio>
            <Radio value="Female"> Female </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="cafe_id" label="Cafe">
          <Select placeholder="Select Cafe" options={cafeConvertedData} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EmployeeForm;
