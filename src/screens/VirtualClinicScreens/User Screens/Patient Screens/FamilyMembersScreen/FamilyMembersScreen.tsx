import styles from "screens/VirtualClinicScreens/User Screens/Patient Screens/FamilyMembersScreen/FamilyMembersScreen.module.css";

import React from "react";
import { useNav } from "hooks/useNav";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table, InputRef, Select, Form } from "antd";
import type { FormInstance } from "antd/es/form";
import type {
  ColumnType,
  ColumnsType,
  FilterValue,
  SorterResult,
  FilterConfirmProps,
} from "antd/es/table/interface";
import { RootState } from "redux/rootReducer";
import { addFamilyMemberAction } from "redux/VirtualClinicRedux/AddFamilyMember/addFamilyMemberAction";
import { getFamilyMembersAction } from "redux/VirtualClinicRedux/GetFamilyMembers/getFamilyMembersAction";
import { val } from "cheerio/lib/api/attributes";

interface DataType {
  name: string;
  nationalID: string;
  age: Number;
  gender: string;
  relationship: string;
  username: string;
  email: string;
  key: string;
}

type DataIndex = keyof DataType;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { Option } = Select;

const FamilyMembersScreen = () => {
  const formRef = React.useRef<FormInstance>(null);

  const { userData, accessToken } = useSelector(
    (state: RootState) => state.userReducer
  );

  const addPatientMember = async (values: any) => {
    console.log(values.patientRelationship);
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_CLINIC}patient/addFamilyMember`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          memberEmail: values.patientEmail,
          memberMobileNumber: values.patientMobileNumber,
          relationship: values.patientRelationship,
          isPatient: true,
        }),
      }
    );
    dispatch(
      getFamilyMembersAction({
        patientEmail: userData?.email,
      })
    );
    const data = await res.json();
  };

  const onFinish = async (values: any) => {
    await dispatch(
      addFamilyMemberAction({
        patientEmail: userData?.email,
        name: values.name,
        nationalID: values.nationalID,
        age: Number(values.age),
        gender: values.gender,
        relationship: values.relationship,
      })
    );
    onReset();
    dispatch(
      getFamilyMembersAction({
        patientEmail: userData?.email,
      })
    );
    console.log("values: ", values);
  };

  const onReset = () => {
    formRef.current?.resetFields();
  };

  const dispatch: any = useDispatch();

  const { addingFamMemLoading, confirm } = useSelector(
    (state: RootState) => state.addFamilyMemberReducer
  );

  const { familyMembersLoading, userFamilyMembers } = useSelector(
    (state: RootState) => state.getFamilyMembersReducer
  );

  const data: DataType[] = //}|
    userFamilyMembers
      ?.filter((user: any) => user.type === "GUEST")
      .map((user: any) => ({
        name: user.familyMember?.name, // |
        nationalID: user.familyMember?.nationalID, // |
        age: user.familyMember?.age, // |Trying to populate the table with the data
        gender: user.familyMember?.gender, // |
        relationship: user.familyMember?.relation, // |
        key: user.familyMember?._id, // |
      })); //}|

  const patientData: DataType[] = //}|
    userFamilyMembers
      ?.filter((user: any) => user.type === "EXISTING")
      .map((user: any) => ({
        name: user.familyMember?.name, // |
        username: user.familyMember?.username, // |
        email: user.familyMember?.email,
        relationship: user.relation, // |
        key: user.familyMember?._id, // |
      }));

  useEffect(() => {
    dispatch(
      getFamilyMembersAction({
        patientEmail: userData?.email,
      })
    );
    console.log(userFamilyMembers);
  }, []);

  //Testing data
  // const data: DataType[] = [
  //   {
  //     name: 'Ali',
  //     nationalID: "123456",
  //     age: 5,
  //     gender:"M",
  //     relationship: "CHILD",
  //     key: "1",
  //   },
  //   {
  //     name: "Wael",
  //     nationalID: "12345678",
  //     age: 50,
  //     gender:"M",
  //     relationship: "HUSBAND",
  //     key: "2",
  //   },
  //   {
  //     name: "Lara",
  //     nationalID: "11111111111111",
  //     age: 23,
  //     gender:"F",
  //     relationship: "WIFE",
  //     key: "3",
  //   },
  //   {
  //     name: "Malek",
  //     nationalID: "2345678",
  //     age: 21,
  //     gender:"M",
  //     relationship: "Husband",
  //     key: "4",
  //   },
  // ];

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "National ID",
      dataIndex: "nationalID",
      key: "nationalID",
      width: "25%",
      ...getColumnSearchProps("nationalID"),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: "10%",
      ...getColumnSearchProps("age"),
      sorter: (a, b) => parseInt(a.age.toString()) - parseInt(b.age.toString()),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      filters: [
        { text: "Male", value: "MALE" },
        { text: "Female", value: "FEMALE" },
      ],
      onFilter: (value: React.Key | boolean, record) =>
        record.gender.indexOf(value as string) === 0,
      ellipsis: true,
    },
    {
      title: "Relationship",
      dataIndex: "relationship",
      key: "relationship",
      width: "15%",
      filters: [
        { text: "HUSBAND", value: "HUSBAND" },
        { text: "WIFE", value: "WIFE" },
        { text: "CHILD", value: "CHILD" },
      ],
      onFilter: (value: React.Key | boolean, record) =>
        record.relationship.indexOf(value as string) === 0,
      ellipsis: true,
    },
  ];

  const patientColumns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      ...getColumnSearchProps("username"),
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Relationship",
      dataIndex: "relationship",
      key: "relationship",
      width: "15%",
      filters: [
        { text: "HUSBAND", value: "HUSBAND" },
        { text: "WIFE", value: "WIFE" },
        { text: "CHILD", value: "CHILD" },
      ],
      onFilter: (value: React.Key | boolean, record) =>
        record.relationship.indexOf(value as string) === 0,
      ellipsis: true,
    },
  ];

  return (
    <div className={`w-full flex flex-col items-start justify-center`}>
      <h1 className="pageHeading">Family Members</h1>
      <div className="flex flex-row items-center justify-center">
        <Form
          {...layout}
          ref={formRef}
          name="control-ref"
          onFinish={onFinish}
          style={{ maxWidth: 800 }}
        >
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="nationalID"
            label="National ID"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="age" label="Age" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
            <Select placeholder="Select a Gender" allowClear>
              <Option value="MALE">Male</Option>
              <Option value="FEMALE">Female</Option>
            </Select>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.gender !== currentValues.gender
            }
          ></Form.Item>
          <Form.Item
            name="relationship"
            label="RelationShip"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select your relationship" allowClear>
              <Option value="HUSBAND">Husband</Option>
              <Option value="WIFE">Wife</Option>
              <Option value="CHILD">Child</Option>
            </Select>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.gender !== currentValues.gender
            }
          ></Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Form.Item>
        </Form>
        <Form className="ml-8" onFinish={addPatientMember}>
          <Form.Item
            name="patientEmail"
            label="Patient's Email"
            // rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="patientMobileNumber"
            label="Patient's Mobile Number"
            // rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="patientRelationship"
            label="RelationShip"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select your relationship" allowClear>
              <Option value="HUSBAND">Husband</Option>
              <Option value="WIFE">Wife</Option>
              <Option value="CHILD">Child</Option>
            </Select>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
      <hr />
      <Table
        dataSource={data}
        columns={columns}
        onChange={clearFilters}
      ></Table>
      <Table
        dataSource={patientData}
        columns={patientColumns}
        onChange={clearFilters}
      ></Table>
    </div>
  );
};

export default FamilyMembersScreen;
