import { Link } from 'react-router-dom';
import { Home, Users, Eye, Briefcase, Layout } from 'lucide-react';

const SideNavbar = () => {
    return (
        <div className="sidebar-container">
            <div className="logo-container">
                <h2 className="logo">ToraBasa</h2>
            </div>
            <div className="nav-container">
                <nav>
                    <Link to="/admin/dashboard" className="nav-link">
                        <Layout size={20} />
                        Dashboard
                    </Link>
                    <Link to="/admin/dashboard/accommodation" className="nav-link">
                        <Home size={20} />
                        Accommodation
                    </Link>
                    <Link to="/admin/dashboard/professionals" className="nav-link">
                        <Users size={20} />
                        Professionals
                    </Link>
                    <Link to="/admin/dashboard/viewing" className="nav-link">
                        <Eye size={20} />
                        Viewing
                    </Link>
                    <Link to="/admin/dashboard/jobs" className="nav-link">
                        <Briefcase size={20} />
                        Jobs
                    </Link>
                </nav>
            </div>
        </div>
    )
}

export default SideNavbar;