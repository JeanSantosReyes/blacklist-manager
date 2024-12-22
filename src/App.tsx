import { useEffect, useRef, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MainContent, Sidebar } from './components';
import { useAuth } from './context';
import { AuthPage, BlockUserPage, HomePage, InfoPage } from './pages';

export const App = () => {
  const { auth } = useAuth();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setSidebarVisible(window.innerWidth >= 992);

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && window.innerWidth < 992) {
        setSidebarVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const closeSidebarOnSmallScreens = () => {
    if (window.innerWidth < 992) {
      setSidebarVisible(false);
    }
  };

  return (
    !auth ? (
      <Routes>
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/*' element={<Navigate to='/auth' replace />} />
      </Routes>
    ) : (
      <div className='d-flex'>
        <Sidebar visible={sidebarVisible} ref={sidebarRef} onItemClick={closeSidebarOnSmallScreens} />
        <MainContent toggleSidebar={toggleSidebar}>
          <Routes>
            <Route path='/app' element={<HomePage />} />
            <Route path='/block' element={<BlockUserPage />} />
            <Route path='/info' element={<InfoPage />} />
            <Route path='/*' element={<Navigate to='/app' replace />} />
          </Routes>
        </MainContent>
      </div>
    )
  )
}