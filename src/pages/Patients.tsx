import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { 
  LayoutGrid, 
  List, 
  User, 
  ArrowRight, 
  Search, 
  Filter, 
  Activity, 
  CalendarDays, 
  Stethoscope 
} from "lucide-react";
import { Link } from "react-router-dom";
import { usePatientStore } from "../store/usePatientStore";

const Patients = () => {
  const { patients, viewType, toggleView } = usePatientStore();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: "Stable" | "Critical" | "Recovering") => {
    switch (status) {
      case "Critical":
        return "bg-rose-100 text-rose-700 border-rose-200";
      case "Recovering":
        return "bg-indigo-100 text-indigo-700 border-indigo-200";
      case "Stable":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-8 space-y-8 animated fadeIn">
      {/* Premium Header Control Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100 gap-6">
        <div className="flex gap-4 items-center">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Patient Directory
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Currently monitoring <span className="text-blue-600 font-bold">{patients.length}</span> active patients.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-3">
          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search patients..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-400"
            />
          </div>
          
          <Button variant="outline" className="w-full sm:w-auto gap-2 font-medium bg-white text-slate-700 border-slate-200 hover:bg-slate-50">
            <Filter className="h-4 w-4" /> Filter
          </Button>

          {/* Toggle Switch */}
          <div className="flex items-center border border-slate-200 rounded-lg p-1 bg-slate-50 shadow-inner w-full sm:w-auto justify-center">
            <Button
              variant={viewType === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => viewType !== "grid" && toggleView()}
              className={`gap-2 ${viewType === "grid" ? "shadow-md" : "text-slate-500 hover:text-slate-900"}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewType === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => viewType !== "list" && toggleView()}
              className={`gap-2 ${viewType === "list" ? "shadow-md" : "text-slate-500 hover:text-slate-900"}`}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {viewType === "grid" ? (
        /* --- RICH GRID VIEW --- */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPatients.map((p) => (
            <Link key={p.id} to={`/patients/${p.id}`}>
              <Card className="hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 border-slate-200/60 bg-white group overflow-hidden relative">
                {/* Top color status bar */}
                <div className={`h-1.5 w-full absolute top-0 left-0 ${
                   p.status === "Critical" ? "bg-rose-500" : 
                   p.status === "Recovering" ? "bg-indigo-500" : "bg-emerald-500"
                }`} />
                
                <CardHeader className="flex flex-row items-start justify-between pb-2 pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      <User size={20} />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-extrabold group-hover:text-blue-600 transition-colors">
                        {p.name}
                      </CardTitle>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                        {p.id}
                      </p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${getStatusColor(p.status)}`}>
                    {p.status}
                  </span>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="space-y-1">
                      <div className="text-slate-400 font-medium text-xs flex items-center gap-1">
                        <User className="h-3 w-3" /> Gender & Age
                      </div>
                      <div className="font-semibold text-slate-700">
                        {p.gender}, {p.age}y
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-slate-400 font-medium text-xs flex items-center gap-1">
                        <CalendarDays className="h-3 w-3" /> Last Visit
                      </div>
                      <div className="font-semibold text-slate-700">
                        {new Date(p.lastVisit).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 group-hover:bg-blue-50/50 transition-colors">
                    <div className="text-slate-400 font-medium text-xs flex items-center gap-1 mb-1">
                      <Stethoscope className="h-3 w-3" /> Primary Diagnosis
                    </div>
                    <div className="font-bold text-slate-800 text-sm truncate">
                      {p.diagnosis}
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <div className="text-blue-600 text-sm font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                      View full chart <ArrowRight size={14} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
          {filteredPatients.length === 0 && (
             <div className="col-span-full py-12 text-center text-slate-500 font-medium">
               No patients found matching "{searchTerm}"
             </div>
          )}
        </div>
      ) : (
        /* --- RICH LIST VIEW --- */
        <div className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/80 border-b border-slate-100">
                <tr>
                  <th className="p-5 font-bold text-sm text-slate-500 uppercase tracking-wider">Patient Name</th>
                  <th className="p-5 font-bold text-sm text-slate-500 uppercase tracking-wider">Diagnosis</th>
                  <th className="p-5 font-bold text-sm text-slate-500 uppercase tracking-wider">Age/Gender</th>
                  <th className="p-5 font-bold text-sm text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="p-5 font-bold text-sm text-slate-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPatients.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-blue-50/30 transition-colors group"
                  >
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                           <User size={16} />
                         </div>
                         <div>
                           <div className="font-extrabold text-slate-900">{p.name}</div>
                           <div className="text-[11px] font-semibold text-slate-400 mt-0.5">{p.id}</div>
                         </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <Activity className="h-4 w-4 text-slate-400" />
                        {p.diagnosis}
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="text-sm font-semibold text-slate-600">
                        {p.age} yrs • {p.gender}
                      </div>
                    </td>
                    <td className="p-5">
                       <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getStatusColor(p.status)}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="p-5 text-right">
                      <Link
                        to={`/patients/${p.id}`}
                      >
                         <Button variant="ghost" size="sm" className="text-blue-600 font-semibold group-hover:bg-blue-100">
                           View Details
                         </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredPatients.length === 0 && (
               <div className="py-12 text-center text-slate-500 font-medium w-full">
                 No patients found matching "{searchTerm}"
               </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Patients;
