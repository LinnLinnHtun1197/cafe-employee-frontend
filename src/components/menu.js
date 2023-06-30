import { Menu, Space } from "antd";
import { useNavigate } from "react-router-dom";

const navigation = [
  { label: "Cafes", key: "/cafes" },
  { label: "Employees", key: "/employees" },
];

const NavMenu = () => {
  const navigate = useNavigate();

  const handleMenuClick = ({ key }) => {
    if (key) {
      navigate(key);
    }
  };

  return (
    <>
      <Space style={{margin: "30px 0px"}}>
        <Menu mode="horizontal" items={navigation} onClick={handleMenuClick} />
      </Space>
    </>
  );
};
export default NavMenu;
