
'use client';
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectItem, SelectContent } from "@/components/ui/select";

const controls = [
  { id: "A.5.1", name: "Policies for Information Security", category: "Organizational", status: "Implemented" },
  { id: "A.5.2", name: "Roles and Responsibilities", category: "Organizational", status: "Planned" },
  { id: "A.8.7", name: "Protection Against Malware", category: "Technological", status: "Not Started" },
];

export default function ISOControlsDashboard() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");

  const filteredControls = controls.filter(c =>
    (c.name.toLowerCase().includes(search.toLowerCase()) || c.id.includes(search)) &&
    (status ? c.status === status : true) &&
    (category ? c.category === category : true)
  );

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input placeholder="Search by control name or ID" value={search} onChange={e => setSearch(e.target.value)} />
        <Select onValueChange={setCategory}>
          <SelectTrigger>Category</SelectTrigger>
          <SelectContent>
            <SelectItem value="">All</SelectItem>
            <SelectItem value="Organizational">Organizational</SelectItem>
            <SelectItem value="Technological">Technological</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setStatus}>
          <SelectTrigger>Status</SelectTrigger>
          <SelectContent>
            <SelectItem value="">All</SelectItem>
            <SelectItem value="Implemented">Implemented</SelectItem>
            <SelectItem value="Planned">Planned</SelectItem>
            <SelectItem value="Not Started">Not Started</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredControls.map(control => (
          <Card key={control.id}>
            <CardContent className="p-4 space-y-1">
              <div className="font-bold">{control.id}</div>
              <div>{control.name}</div>
              <div className="text-sm text-muted-foreground">{control.category} | {control.status}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
