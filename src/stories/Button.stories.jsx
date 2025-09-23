import Button from "../components/common/Button";

export default {
  title: "Components/Button", // 스토리북 좌측 트리 구조에서 보이는 이름
  component: Button,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "success", "disabled"],
    },
    size: {
      control: { type: "select" },
      options: ["default", "full"],
    },
    loading: { control: "boolean" },
    children: { control: "text" },
  },
};

// 템플릿 함수 (args를 Button에 전달)
const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Primary Button",
  variant: "primary",
  size: "default",
};

export const Success = Template.bind({});
Success.args = {
  children: "Success Button",
  variant: "success",
  size: "default",
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: "Disabled Button",
  variant: "disabled",
  size: "default",
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  children: "Full Width Button",
  variant: "primary",
  size: "full",
};
