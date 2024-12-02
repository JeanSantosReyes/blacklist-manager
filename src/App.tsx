import { useEffect, useRef, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MainContent, Sidebar } from './components';
import { BlockUser, Home, Info } from './pages';

export const App = () => {
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
    <div className='d-flex'>
      <Sidebar visible={sidebarVisible} ref={sidebarRef} onItemClick={closeSidebarOnSmallScreens} />
      <MainContent toggleSidebar={toggleSidebar}>
        <Routes>
          <Route path='/app' element={<Home />} />
          <Route path='/block' element={<BlockUser />} />
          <Route path='/info' element={<Info />} />
          <Route path='/*' element={<Navigate to='/app' replace />} />
        </Routes>
      </MainContent>
    </div>
  )
}