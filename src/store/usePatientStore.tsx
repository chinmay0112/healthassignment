import { create } from "zustand";

// 1. Define what a Patient looks like
export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  diagnosis: string;
  status: "Stable" | "Critical" | "Recovering";
  lastVisit: string;
  history: string[];
}

// 2. Define the Store's structure
interface PatientState {
  patients: Patient[];
  viewType: "grid" | "list";
  toggleView: () => void;
  updatePatientStatus: (id: string, newStatus: Patient["status"]) => void;
  // In a real app, you'd have an action to fetch from an API here
}

// 3. Create the store with some professional mock data
export const usePatientStore = create<PatientState>((set) => ({
  viewType: "grid",
  patients: [
    {
      id: "P001",
      name: "Arjun Mehta",
      age: 45,
      gender: "Male",
      diagnosis: "Hypertension",
      status: "Stable",
      lastVisit: "2026-04-20",
      history: ["Initial checkup: 2026-01-10", "Prescribed Amlodipine"],
    },
    {
      id: "P002",
      name: "Priya Sharma",
      age: 29,
      gender: "Female",
      diagnosis: "Type 1 Diabetes",
      status: "Recovering",
      lastVisit: "2026-04-22",
      history: ["Insulin adjustment on 2026-03-15"],
    },
    {
      id: "P003",
      name: "Vikram Singh",
      age: 68,
      gender: "Male",
      diagnosis: "Post-Op Recovery",
      status: "Critical",
      lastVisit: "2026-04-26",
      history: ["Surgery: 2026-04-25", "Monitoring vitals hourly"],
    },
    {
      id: "P004",
      name: "Ananya Iyer",
      age: 34,
      gender: "Female",
      diagnosis: "Asthma",
      status: "Stable",
      lastVisit: "2026-04-15",
      history: ["Seasonal allergy flare-up"],
    },
  ],
  toggleView: () =>
    set((state) => ({
      viewType: state.viewType === "grid" ? "list" : "grid",
    })),
  updatePatientStatus: (id, newStatus) =>
    set((state) => ({
      patients: state.patients.map((p) =>
        p.id === id ? { ...p, status: newStatus } : p
      ),
    })),
}));
