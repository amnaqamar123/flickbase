import React from "react";
import { Outlet } from "react-router-dom";
import AdminLayout from "../../hoc/adminLayout";

function Dashboard() {
    return (
        <div>
            <AdminLayout>
                <Outlet />
            </AdminLayout>
        </div>
    )
}
export default Dashboard;