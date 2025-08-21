import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SideNavbar from '../../components/Admin/sideNavbar';
import AccommodationApp from '../../components/accommodation/accommodationList';
import ProfessionalsList from '../../components/Admin/ProfessionalsList';
import ViewingList from '../../components/viewing/viewing';
import JobsList from '../../components/jobs/jobs';
import DashboardOverview from './DashboardOverview';
import './dashboard.scss';
import './DashboardOverview.scss';

const Dashboard = () => {
    return (
        <div className="admin-dashboard">
            <SideNavbar />
            <div className="dashboard-content">
                <Routes>
                    <Route index element={<DashboardOverview />} />
                    <Route path="/accommodation" element={<AccommodationApp />} />
                    <Route path="/professionals" element={<ProfessionalsList />} />
                    <Route path="/viewing" element={<ViewingList />} />
                    <Route path="/jobs" element={<JobsList />} />
                </Routes>
            </div>
        </div>
    );
};

export default Dashboard;