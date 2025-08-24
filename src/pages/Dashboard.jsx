import React from 'react';
import StatsCards from '../components/Dashboard/StatsCards';
import UserInteractionChart from '../components/Dashboard/UserInteractionChart';
import RecentProjects from '../components/Dashboard/RecentProjects';
import RecentMessages from '../components/Dashboard/RecentMessages';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCards />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserInteractionChart />
        <RecentMessages />
      </div>

      <RecentProjects />
    </div>
  );
};

export default Dashboard;
