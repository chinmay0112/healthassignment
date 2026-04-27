import React from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import {
  Bell,
  Calendar,
  User,
  Clock,
  ArrowUpRight,
  Activity,
  FileText,
  CheckCircle2,
  Syringe,
} from "lucide-react";

// Mock Data
const upcomingAppointments = [
  {
    id: 1,
    patient: "Sarah Jenkins",
    time: "09:00 AM",
    type: "General Checkup",
    status: "Waiting",
  },
  {
    id: 2,
    patient: "Michael Chen",
    time: "10:30 AM",
    type: "Cardiology Consult",
    status: "Confirmed",
  },
  {
    id: 3,
    patient: "Emily Rodriguez",
    time: "11:15 AM",
    type: "Post-op Review",
    status: "In Progress",
  },
];

const recentActivities = [
  {
    id: 1,
    title: "Lab Results Ready",
    desc: "Blood work for David Smith is available.",
    time: "10 mins ago",
    icon: FileText,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    id: 2,
    title: "Patient Discharged",
    desc: "Room 402 has been cleared.",
    time: "1 hour ago",
    icon: CheckCircle2,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    id: 3,
    title: "Emergency Alert",
    desc: "Code Blue in ICU Wing A.",
    time: "2 hours ago",
    icon: Activity,
    color: "text-red-500",
    bg: "bg-red-50",
  },
];

const Dashboard = () => {
  const simulateNotification = async () => {
    try {
      // 1. Check and request permission
      let permission = Notification.permission;
      if (permission === "default") {
        permission = await Notification.requestPermission();
      }

      if (permission === "granted") {
        // 2. Use .ready instead of .controller to guarantee we have an active SW
        const registration = await navigator.serviceWorker.ready;
        if (registration.active) {
          registration.active.postMessage({
            type: "SHOW_NOTIFICATION",
            payload: {
              title: "🚨 New Patient Alert",
              body: "A new patient (John Doe) has been admitted to Ward 4. Immediate attention required.",
            },
          });

          toast.success("System Notification Sent", {
            description:
              "The alert has been successfully broadcasted to your connected devices.",
          });
        } else {
          console.error("No active service worker found!");
          alert(
            "Service worker is still loading, please try again in a second.",
          );
        }
      } else {
        alert("You have denied notification permissions in your browser.");
      }
    } catch (error) {
      console.error("Error triggering notification:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-8 space-y-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold shadow-inner">
            Dr.
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Welcome back, Dr. Smith
            </h1>
            <p className="text-slate-500 mt-1 font-medium">
              You have <span className="text-blue-600 font-bold">12</span>{" "}
              patients scheduled for today.
            </p>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
          <Link to="/analytics">
            <Button variant="outline" className="gap-2 font-medium text-indigo-600 border-indigo-200 hover:bg-indigo-50">
              <Activity className="h-4 w-4" /> View Analytics
            </Button>
          </Link>
          <Button variant="outline" className="gap-2 font-medium">
            <Calendar className="h-4 w-4 text-slate-500" /> View Schedule
          </Button>
          <Button
            onClick={simulateNotification}
            className="gap-2 bg-rose-500 hover:bg-rose-600 shadow-md shadow-rose-500/20 transition-all font-medium"
          >
            <Bell className="h-4 w-4" /> Simulate Patient Alert
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Appointments */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-slate-200/60 shadow-sm bg-white overflow-hidden">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50 flex flex-row items-center justify-between py-4">
              <div>
                <CardTitle className="text-lg font-bold text-slate-800">
                  Today's Appointments
                </CardTitle>
                <CardDescription>
                  Your schedule for the next few hours
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 font-medium"
              >
                View All
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {upcomingAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <User className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900">
                          {apt.patient}
                        </h4>
                        <p className="text-sm text-slate-500 font-medium">
                          {apt.type}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-slate-700 font-bold justify-end gap-1.5 mb-1">
                        <Clock className="h-4 w-4 text-slate-400" />
                        {apt.time}
                      </div>
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          apt.status === "Waiting"
                            ? "bg-amber-100 text-amber-700"
                            : apt.status === "In Progress"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {apt.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-slate-200/60 shadow-sm bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 font-medium text-sm">
                      Active Patients
                    </p>
                    <h3 className="text-4xl font-extrabold mt-1">42</h3>
                  </div>
                  <div className="h-14 w-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <User className="h-7 w-7 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-slate-200/60 shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-500 font-medium text-sm">
                      Pending Labs
                    </p>
                    <h3 className="text-4xl font-extrabold mt-1 text-slate-800">
                      8
                    </h3>
                  </div>
                  <div className="h-14 w-14 bg-amber-50 rounded-full flex items-center justify-center text-amber-500">
                    <Syringe className="h-7 w-7" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column: Activity Feed */}
        <div className="space-y-8">
          <Card className="border-slate-200/60 shadow-sm bg-white h-full">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-lg font-bold text-slate-800">
                Recent Activity
              </CardTitle>
              <CardDescription>Latest system updates</CardDescription>
            </CardHeader>
            <CardContent className="p-5">
              <div className="space-y-6">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex gap-4">
                      <div
                        className={`mt-0.5 h-10 w-10 shrink-0 rounded-full flex items-center justify-center ${activity.bg} ${activity.color}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-900">
                          {activity.title}
                        </p>
                        <p className="text-sm text-slate-500 leading-snug">
                          {activity.desc}
                        </p>
                        <p className="text-xs font-semibold text-slate-400 flex items-center">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Button
                variant="outline"
                className="w-full mt-6 text-slate-600 font-medium group"
              >
                View All Activity
                <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
