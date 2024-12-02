import { Menu } from 'lucide-react';

interface MainContentProps {
    toggleSidebar: () => void;
    children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ toggleSidebar, children }) => {
    return (
        <div className='flex-grow-1' style={{ marginLeft: '0', transition: 'margin-left 0.3s' }}>
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <div className='container-fluid'>
                    <button className='btn btn-outline-light d-lg-none me-2' onClick={toggleSidebar}>
                        <Menu />
                    </button>
                    <span className='navbar-brand'>Blacklist App</span>
                </div>
            </nav>
            <div className='container-fluid mt-4'>
                {children}
            </div>
        </div>
    )
}
export default MainContent