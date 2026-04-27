import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { 
  ChevronLeft, 
  Activity, 
  CalendarDays, 
  ClipboardList,
  User,
  HeartPulse,
  Stethoscope,
  Clock,
  CheckCircle2,
  Syringe
} from "lucide-react";
import { Button } from "../components/ui/button";
import { usePatientStore } from "../store/usePatientStore";
import { toast } from "sonner";

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { patients, updatePatientStatus } = usePatientStore();

  const patient = patients.find((p) => p.id === id);

  if (!patient) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10 bg-slate-50/50">
      <h2 className="text-2xl font-bold text-slate-800">Patient not found</h2>
      <p className="text-slate-500 mt-2">The requested patient ID does not exist in the system.</p>
      <Button onClick={() => navigate(-1)} className="mt-6" variant="outline">Go Back</Button>
    </div>
  );

  const getStatusColor = (status: string) => {
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

  const handleUpdateStatus = (newStatus: "Stable" | "Critical" | "Recovering") => {
    updatePatientStatus(patient.id, newStatus);
    toast.success("Patient Status Updated", {
      description: `${patient.name} has been marked as ${newStatus}.`
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-8 space-y-8 animated fadeIn">
      
      {/* Navigation Line */}
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)} 
        className="gap-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 font-medium -ml-4"
      >
        <ChevronLeft size={16} /> Back to Directory
      </Button>

      {/* Main Profile Header Row */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-white p-8 rounded-2xl shadow-sm border border-slate-100 gap-6">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 overflow-hidden relative">
            <User className="h-10 w-10 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-1">
              {patient.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-500">
               <span className="flex items-center gap-1.5"><User className="h-4 w-4"/> {patient.gender}, {patient.age}y</span>
               <span className="text-slate-300">•</span>
               <span>MRN: <span className="text-slate-700 font-bold uppercase">{patient.id}</span></span>
               <span className="text-slate-300">•</span>
               <span className={`px-2.5 py-0.5 rounded-full border text-xs font-bold ${getStatusColor(patient.status)}`}>
                  {patient.status}
               </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 w-full lg:w-auto mt-2 lg:mt-0">
          {patient.status !== "Stable" && (
             <Button onClick={() => handleUpdateStatus("Stable")} variant="outline" className="gap-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-emerald-50/30 font-semibold w-full sm:w-auto">
               <CheckCircle2 className="h-4 w-4" /> Mark Stable
             </Button>
          )}
          {patient.status !== "Recovering" && (
             <Button onClick={() => handleUpdateStatus("Recovering")} variant="outline" className="gap-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50 bg-indigo-50/30 font-semibold w-full sm:w-auto">
               <Activity className="h-4 w-4" /> Move to Recovery
             </Button>
          )}
        </div>
      </div>

      {/* Grid Layout for Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Main Details) - spans 2 cols */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-slate-200/60 shadow-sm overflow-hidden bg-white">
             {/* Vibrant Top Border */}
             <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-indigo-600" />
             <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-5 pt-6">
                <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Stethoscope className="text-blue-600 h-5 w-5" /> 
                  Medical Diagnosis
                </CardTitle>
             </CardHeader>
             <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-400 tracking-wider uppercase mb-2">Primary Diagnosis</h4>
                    <p className="text-2xl font-extrabold text-slate-900">{patient.diagnosis}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-400 tracking-wider uppercase mb-2">Current Status Code</h4>
                    <p className="text-lg font-semibold text-slate-700">{patient.status} / Monitoring</p>
                  </div>
                </div>
             </CardContent>
          </Card>

          <Card className="border-slate-200/60 shadow-sm bg-white">
             <CardHeader className="border-b border-slate-100 pb-5">
                <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <ClipboardList className="text-amber-500 h-5 w-5" /> 
                  Patient History & Notes
                </CardTitle>
             </CardHeader>
             <CardContent className="p-6">
                <div className="space-y-6 flex flex-col pt-2">
                  {patient.history && patient.history.length > 0 ? (
                    patient.history.map((record, idx) => (
                      <div key={idx} className="flex gap-4 relative">
                        {/* Timeline Connector Line */}
                        {idx !== patient.history.length - 1 && (
                          <div className="absolute left-4 top-10 bottom-[-24px] w-0.5 bg-slate-100" />
                        )}
                        <div className="mt-1 h-8 w-8 rounded-full bg-slate-50 border-2 border-amber-100 flex items-center justify-center text-amber-500 shrink-0 relative z-10">
                           <Clock size={14} />
                        </div>
                        <div className="bg-slate-50/80 hover:bg-slate-100 transition-colors border border-slate-100 rounded-xl p-4 w-full">
                           <p className="font-semibold text-slate-800">{record}</p>
                           <p className="text-sm text-slate-400 mt-1">Reviewing physician logged entry.</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-slate-500 font-medium">No prior medical history records found.</div>
                  )}
                </div>
             </CardContent>
          </Card>
        </div>

        {/* Right Column (Quick Stats / Vitals) - spans 1 col */}
        <div className="space-y-8">
           <Card className="border-slate-200/60 shadow-sm bg-white top-8 sticky">
             <CardHeader className="border-b border-slate-100 pb-4">
                <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <HeartPulse className="text-rose-500 h-5 w-5" /> 
                  Quick Vitals
                </CardTitle>
             </CardHeader>
             <CardContent className="p-6 space-y-5">
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                   <div className="text-sm font-medium text-slate-500">Heart Rate</div>
                   <div className="font-bold tracking-tight text-slate-900">72 <span className="text-xs text-slate-400 font-normal">bpm</span></div>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                   <div className="text-sm font-medium text-slate-500">Blood Pressure</div>
                   <div className="font-bold tracking-tight text-slate-900">120/80 <span className="text-xs text-slate-400 font-normal">mmHg</span></div>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                   <div className="text-sm font-medium text-slate-500">Temperature</div>
                   <div className="font-bold tracking-tight text-slate-900">98.6 <span className="text-xs text-slate-400 font-normal">°F</span></div>
                </div>
                <div className="flex justify-between items-center py-2">
                   <div className="text-sm font-medium text-slate-500 flex items-center gap-1.5"><CalendarDays size={14}/> Last Encounter</div>
                   <div className="font-bold tracking-tight text-slate-900">{new Date(patient.lastVisit).toLocaleDateString()}</div>
                </div>
                
                <Button className="w-full mt-4 bg-slate-900 hover:bg-slate-800 gap-2">
                  <Syringe className="h-4 w-4" /> Request Lab Work
                </Button>
             </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default PatientDetails;
