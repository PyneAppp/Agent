import React, { useState, useEffect } from 'react';
import { Users, Home, Eye, Briefcase, TrendingUp, Calendar, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardOverview = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalProfessionals: 0,
    totalViewings: 0,
    totalJobs: 0
  });

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, action: 'New property added', item: 'Sunset Apartments', time: '2 hours ago' },
    { id: 2, action: 'Professional registered', item: 'John Smith', time: '4 hours ago' },
    { id: 3, action: 'Viewing scheduled', item: 'Luxury Villa', time: '1 day ago' },
    { id: 4, action: 'Job posted', item: 'House Cleaner Needed', time: '1 day ago' }
  ]);

  // Mock data for demonstration
  useEffect(() => {
    // In a real app, this would come from an API
    setStats({
      totalProperties: 42,
      totalProfessionals: 28,
      totalViewings: 15,
      totalJobs: 8
    });
  }, []);

  // Quick action handlers
  const handleAddProperty = () => {
    navigate('/admin/dashboard/accommodation');
    // In a real app, you might want to open a modal or navigate to a specific add form
  };

  const handleAddProfessional = () => {
    navigate('/admin/dashboard/professionals');
    // In a real app, you might want to open a modal or navigate to a specific add form
  };

  const handleScheduleViewing = () => {
    navigate('/admin/dashboard/viewing');
    // In a real app, you might want to open a modal or navigate to a specific add form
  };

  const handlePostJob = () => {
    navigate('/admin/dashboard/jobs');
    // In a real app, you might want to open a modal or navigate to a specific add form
  };

  return (
    <div className="dashboard-overview">
      <div className="page-header">
        <h1 className="page-title">Dashboard Overview</h1>
        <p className="page-subtitle">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon bg-blue-100 text-blue-600">
            <Home size={24} />
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.totalProperties}</h3>
            <p className="stat-label">Total Properties</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-green-100 text-green-600">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.totalProfessionals}</h3>
            <p className="stat-label">Professionals</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-purple-100 text-purple-600">
            <Eye size={24} />
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.totalViewings}</h3>
            <p className="stat-label">Viewings</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-orange-100 text-orange-600">
            <Briefcase size={24} />
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.totalJobs}</h3>
            <p className="stat-label">Job Listings</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="activity-section">
        <div className="section-header">
          <h2 className="section-title">Recent Activity</h2>
          <button className="view-all-btn">View All</button>
        </div>
        
        <div className="activity-list">
          {recentActivities.map(activity => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon">
                <TrendingUp size={16} />
              </div>
              <div className="activity-content">
                <p className="activity-action">{activity.action}</p>
                <p className="activity-item-name">{activity.item}</p>
              </div>
              <div className="activity-time">
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-section">
        <div className="section-header">
          <h2 className="section-title">Quick Actions</h2>
        </div>
        
        <div className="quick-actions-grid">
          <button className="quick-action-card" onClick={handleAddProperty}>
            <Home size={24} />
            <span>Add Property</span>
          </button>
          
          <button className="quick-action-card" onClick={handleAddProfessional}>
            <Users size={24} />
            <span>Add Professional</span>
          </button>
          
          <button className="quick-action-card" onClick={handleScheduleViewing}>
            <Calendar size={24} />
            <span>Schedule Viewing</span>
          </button>
          
          <button className="quick-action-card" onClick={handlePostJob}>
            <Briefcase size={24} />
            <span>Post Job</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;