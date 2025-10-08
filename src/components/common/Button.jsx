import styled, { css, keyframes } from "styled-components";

// 버튼 너비 종류는 2가지임
const sizeStyles = {
  default: css``,
  full: css`
    width: 100%;
    display: block;
  `,
};

// 버튼 색깔 종류는 3가지임
const variantStyles = {
  primary: css`
    background-color: #2563eb;
    color: white;

    &:hover:not(:disabled) {
      background-color: #1d4ed8;

      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    }

    &:focus:not(:disabled) {
      outline: none;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.3);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
      background-color: #1e40af;
    }
  `,
  success: css`
    background-color: #22c55e;
    color: white;

    &:hover:not(:disabled) {
      background-color: #16a34a;

      box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
    }

    &:focus:not(:disabled) {
      outline: none;
      box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.3);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
      background-color: #15803d;
    }
  `,
  secondary: css`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background-color: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    font-size: 0.95rem;
    font-weight: 500;
    color: #374151;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: #f9fafb;
      border-color: #d1d5db;
    }
  `,
  disabled: css`
    background-color: #d1d5db;
    color: #9ca3af;
    cursor: not-allowed;
    opacity: 0.6;

    &:hover {
      transform: none;
      box-shadow: none;
    }
  `,
};

const StyledButton = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px 20px; // 패딩 증가로 더 클릭하기 쉽게
  font-size: 1rem;
  font-weight: 600; // 폰트 웨이트 증가
  cursor: pointer;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px; // 아이콘과 텍스트 간격

  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover:not(:disabled) {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    pointer-events: none;
  }

  ${({ variant }) => variantStyles[variant] || variantStyles.primary}
  ${({ size }) => sizeStyles[size] || sizeStyles.default}
`;

// 로딩 스피너
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 2px solid rgba(255, 255, 255, 0.3); // 더 부드러운 스피너 색상
  border-top: 2px solid white;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: ${spin} 0.8s linear infinite; // 애니메이션 속도 조정
`;

const LoadingText = styled.span`
  opacity: 0.7;
`;

const Button = ({
  children,
  variant = "primary",
  size = "default",
  loading = false,
  disabled = false,
  ...props
}) => {
  return (
    <StyledButton
      variant={loading || disabled ? "disabled" : variant}
      size={size}
      disabled={loading || disabled}
      {...props} // 추가 props 전달
    >
      {loading ? (
        <>
          <Spinner />
          <LoadingText>로딩중...</LoadingText>
        </>
      ) : (
        children
      )}
    </StyledButton>
  );
};

export default Button;
