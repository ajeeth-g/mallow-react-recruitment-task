import { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import store from './app/store';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Spin } from 'antd';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const UserListPage = lazy(() => import('./pages/UserListPage'));
const DashboardLayout = lazy(() => import('./layout/DashboardLayout'));

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary>
          <Suspense fallback={<Spin fullscreen />}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />

              <Route
                path="/users"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <UserListPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
