import { forwardRef } from 'react';
import { NavLink } from 'react-router-dom';
import { CircleOff, House, Info } from 'lucide-react';

interface SidebarProps {
    visible: boolean;
    onItemClick: () => void;
}

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(({ visible, onItemClick }, ref) => {
    return (
        <div ref={ref} className={`bg-light border-end ${visible ? 'd-block' : 'd-none'} d-lg-block`} style={{ width: '250px', minHeight: '100vh', position: 'fixed', zIndex: 1000 }}>
            <div className='p-3 border-bottom'>
                <h5>BIODEL</h5>
            </div>
            <ul className='nav flex-column p-3'>
                <li className='nav-item'>
                    <NavLink to='/app' className='nav-link' end onClick={onItemClick}>
                        <House className='me-2' /> HOME
                    </NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink to='/block' className='nav-link' onClick={onItemClick}>
                        <CircleOff className='me-2' />BLOCK USER
                    </NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink to='/info' className='nav-link' onClick={onItemClick}>
                        <Info className='me-2' /> INFO
                    </NavLink>
                </li>
            </ul>
        </div>
    );
});

export default Sidebar