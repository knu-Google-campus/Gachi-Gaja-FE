import Header from "../components/common/Header";
import Button from "../components/common/Button";

export default {
  title: "Components/Header",
  component: Header,
};

// 템플릿 함수
const Template = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  right: (
    <>
      <Button variant="primary" size="default">로그인</Button>
      <Button variant="success" size="default">회원가입</Button>
    </>
  ),
};

// 오른쪽에 버튼 한 개만 넣고 싶은 경우
export const SingleButton = Template.bind({});
SingleButton.args = {
  right: <Button variant="primary" size="default">로그인</Button>,
};