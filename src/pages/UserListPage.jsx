import { Alert, Empty, Modal, Pagination, Spin, message } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { UserGrid } from '../components/users/UserGrid';
import { UserListToolbar } from '../components/users/UserListToolbar';
import { UserModal } from '../components/users/UserModal';
import { UserTable } from '../components/users/UserTable';
import {
  setPage,
  setSearchTerm,
  setViewMode,
} from '../features/users/usersSlice';
import { deleteExistingUser, fetchUsers } from '../features/users/usersThunks';

const UserListPage = () => {
  const { data, searchTerm, viewMode, pagination, isLoading, error } =
    useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers(pagination.page));
  }, [dispatch, pagination.page]);

  const handleSearch = (value) => {
    dispatch(setSearchTerm(value));
  };

  const handleViewChange = (e) => {
    dispatch(setViewMode(e.target.value));
  };

  const handlePageChange = (page) => {
    dispatch(setPage(page));
  };

  const handleCreateUser = () => {
    setCurrentUser(null);
    setModalVisible(true);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setModalVisible(true);
  };

  const handleDeleteUser = (user) => {
    Modal.confirm({
      title: 'Delete User',
      content: 'Are you sure you want to delete this user?',
      onOk: async () => {
        try {
          await dispatch(deleteExistingUser(user.id));
          message.success('User deleted successfully');
        } catch (error) {
          message.error('Deletion failed');
        }
      },
    });
  };

  const filteredUsers = data.filter((user) =>
    `${user.first_name} ${user.last_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <PageWrapper>
      <ContentWrapper>
        <PageTitle>Users</PageTitle>

        <UserListToolbar
          viewMode={viewMode}
          onViewChange={handleViewChange}
          onSearch={handleSearch}
          onCreateUser={handleCreateUser}
        />

        <MainContent>
          {isLoading ? (
            <LoaderContainer>
              <Spin size="large" />
            </LoaderContainer>
          ) : error ? (
            <Alert
              message="Error"
              description={error}
              type="error"
              showIcon
              style={{ marginBottom: 24 }}
            />
          ) : filteredUsers.length === 0 ? (
            <EmptyContainer>
              <Empty description="No users found" />
            </EmptyContainer>
          ) : viewMode === 'table' ? (
            <TableContainer>
              <UserTable users={filteredUsers} onEdit={handleEditUser} />
            </TableContainer>
          ) : (
            <GridContainer>
              <UserGrid
                users={filteredUsers}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
              />
            </GridContainer>
          )}
        </MainContent>

        {modalVisible && (
          <UserModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            user={currentUser}
          />
        )}
      </ContentWrapper>

      {filteredUsers.length > 0 && (
        <PaginationContainer>
          <Pagination
            current={pagination.page}
            total={pagination.total}
            pageSize={pagination.per_page}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </PaginationContainer>
      )}
    </PageWrapper>
  );
};

export default UserListPage;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow: hidden;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 12px;
`;

const MainContent = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const EmptyContainer = styled(LoaderContainer)``;

const TableContainer = styled.div`
  flex: 1;
  min-height: 0;
  overflow: auto;
  margin-bottom: 16px;
`;

const GridContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 4px;
  margin-top: 8px;
`;
