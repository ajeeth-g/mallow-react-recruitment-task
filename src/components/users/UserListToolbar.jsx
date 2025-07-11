import { MenuFoldOutlined, TableOutlined } from '@ant-design/icons';
import { Input, Radio } from 'antd';
import { Button } from '../ui/Button';
import styled from 'styled-components';

export const UserListToolbar = ({
  viewMode,
  onViewChange,
  onSearch,
  onCreateUser,
}) => {
  return (
    <ToolbarContainer>
      <ViewToggleWrapper>
        <Radio.Group value={viewMode} onChange={onViewChange}>
          <Radio.Button value="table">
            <TableOutlined /> Table View
          </Radio.Button>
          <Radio.Button value="card">
            <MenuFoldOutlined /> Card View
          </Radio.Button>
        </Radio.Group>
      </ViewToggleWrapper>

      <ActionsWrapper>
        <StyledSearch
          placeholder="Search by name"
          allowClear
          onChange={(e) => onSearch(e.target.value)}
        />
        <Button
          btntype="primary"
          htmlType="button"
          onClick={onCreateUser}
          size="medium"
        >
          Create User
        </Button>
      </ActionsWrapper>
    </ToolbarContainer>
  );
};

const ToolbarContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ViewToggleWrapper = styled.div`
  flex: 1;
  min-width: 220px;
`;

const ActionsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: flex-end;
  flex: 1;
  min-width: 280px;

  @media (max-width: 576px) {
    flex-direction: column;
    width: 100%;
  }
`;

const StyledSearch = styled(Input.Search)`
  flex: 1;
  min-width: 180px;
  max-width: 250px;

  @media (max-width: 576px) {
    width: 100%;
  }
`;
