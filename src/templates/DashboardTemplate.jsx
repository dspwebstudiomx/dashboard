import React from "react";
import Header from "../components/Menus/Header";
import Sidebar from "../components/Menus/Sidebar";

const DashboardTemplate = ({ children }) => {
  return (
    <div className="w-full h-screen flex flex-col dark:bg-gray-900">
      <Header />
      <div className="dashboard-content flex flex-grow gap-12">
        <Sidebar />
        <main className="p-12 absolute top-[10vh] left-76 w-[78vw] h-[88vh]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardTemplate;
