import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Users, CalendarCheck, BedDouble, Activity } from "lucide-react";

// Mock Data
const patientVolumeData = [
  { name: "Mon", walkIn: 40, online: 24 },
  { name: "Tue", walkIn: 30, online: 13 },
  { name: "Wed", walkIn: 60, online: 38 },
  { name: "Thu", walkIn: 45, online: 30 },
  { name: "Fri", walkIn: 70, online: 48 },
  { name: "Sat", walkIn: 20, online: 10 },
  { name: "Sun", walkIn: 15, online: 8 },
];

const recoveryData = [
  { name: "Week 1", rate: 60 },
  { name: "Week 2", rate: 65 },
  { name: "Week 3", rate: 75 },
  { name: "Week 4", rate: 82 },
  { name: "Week 5", rate: 88 },
  { name: "Week 6", rate: 95 },
];

const departmentData = [
  { name: "Cardiology", value: 400, color: "#3b82f6" },
  { name: "Neurology", value: 300, color: "#8b5cf6" },
  { name: "Pediatrics", value: 300, color: "#ec4899" },
  { name: "Orthopedics", value: 200, color: "#f59e0b" },
];

const Analytics = () => {
  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-8 space-y-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Health Analytics
          </h1>
          <p className="text-slate-500 mt-1">
            Monitor patient outcomes, clinic volumes, and key hospital performance indicators.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <Card className="hover:shadow-lg transition-all border-slate-200/60 bg-white shadow-sm overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-600">
              Total Appointments
            </CardTitle>
            <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              <CalendarCheck className="h-6 w-6" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">1,284</div>
            <p className="text-sm font-medium text-emerald-600 flex items-center mt-2">
              <Activity className="h-4 w-4 mr-1" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className="hover:shadow-lg transition-all border-slate-200/60 bg-white shadow-sm overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-600">
              New Patients
            </CardTitle>
            <div className="h-12 w-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
              <Users className="h-6 w-6" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">432</div>
            <p className="text-sm font-medium text-emerald-600 flex items-center mt-2">
              <Activity className="h-4 w-4 mr-1" />
              +8.2% from last month
            </p>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card className="hover:shadow-lg transition-all border-slate-200/60 bg-white shadow-sm overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-600">
              Avg Recovery Time
            </CardTitle>
            <div className="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
              <Activity className="h-6 w-6" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              4.2 <span className="text-lg font-medium text-slate-500">days</span>
            </div>
            <p className="text-sm font-medium text-blue-600 flex items-center mt-2">
              -0.8 days improved
            </p>
          </CardContent>
        </Card>

        {/* Card 4 */}
        <Card className="hover:shadow-lg transition-all border-slate-200/60 bg-white shadow-sm overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-600">
              Bed Occupancy
            </CardTitle>
            <div className="h-12 w-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white transition-all duration-300">
              <BedDouble className="h-6 w-6" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">76%</div>
            <p className="text-sm font-medium text-rose-600 flex items-center mt-2">
              +4% from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Array */}
      <div className="grid gap-6 md:grid-cols-7">
        {/* Main Chart: Patient Volume */}
        <Card className="md:col-span-4 lg:col-span-5 hover:shadow-md transition-all border-slate-200/60 bg-white">
          <CardHeader>
            <CardTitle className="text-xl">Weekly Patient Intake</CardTitle>
            <CardDescription className="text-base text-slate-500">Walk-in vs Online consultations over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent className="h-[380px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={patientVolumeData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="walkIn" name="Walk-in" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={50} />
                <Bar dataKey="online" name="Online" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Secondary Chart: Department Distribution */}
        <Card className="md:col-span-3 lg:col-span-2 hover:shadow-md transition-all border-slate-200/60 bg-white">
          <CardHeader>
            <CardTitle className="text-xl">Department Load</CardTitle>
            <CardDescription className="text-base text-slate-500">Patient distribution by specialty</CardDescription>
          </CardHeader>
          <CardContent className="h-[380px] flex items-center justify-center mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  innerRadius={75}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#0f172a', fontWeight: '500' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Chart: Recovery Rate Trend */}
      <Card className="hover:shadow-md transition-all border-slate-200/60 bg-white">
        <CardHeader>
          <CardTitle className="text-xl">Overall Recovery Rate Trend</CardTitle>
          <CardDescription className="text-base text-slate-500">Progression of successful treatments over the last 6 weeks</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={recoveryData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13}} tickFormatter={(value) => `${value}%`} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ color: '#10b981', fontWeight: '600' }}
              />
              <Area type="monotone" dataKey="rate" name="Recovery Rate" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorRate)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
