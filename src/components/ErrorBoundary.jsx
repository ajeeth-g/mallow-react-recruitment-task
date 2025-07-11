import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import styled from 'styled-components';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <Wrapper role="alert">
      <Card>
        <Title>Oops! Something went wrong.</Title>
        <Message>{error.message}</Message>
        <RetryButton onClick={resetErrorBoundary}>Try Again</RetryButton>
      </Card>
    </Wrapper>
  );
};

export const ErrorBoundary = ({ children }) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      {children}
    </ReactErrorBoundary>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  height: 100vh;
  background-color: #f9fafb;
`;

const Card = styled.div`
  background: white;
  padding: 32px;
  border-radius: 12px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 16px;
  color: #222;
`;

const Message = styled.pre`
  white-space: pre-wrap;
  word-break: break-word;
  color: #8c8c8c;
  font-size: 14px;
  margin-bottom: 24px;
`;

const RetryButton = styled.button`
  padding: 10px 20px;
  background-color: #1890ff;
  color: white;
  font-weight: 500;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #1677cc;
  }
`;
