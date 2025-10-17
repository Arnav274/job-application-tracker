"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Application } from "@/types"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  
  // form state
  const [company, setCompany] = useState("")
  const [position, setPosition] = useState("")
  const [url, setUrl] = useState("")
  const [appStatus, setAppStatus] = useState("APPLIED")
  const [location, setLocation] = useState("")
  const [notes, setNotes] = useState("")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  useEffect(() => {
    if (status === "authenticated") {
      fetchApplications()
    }
  }, [status])

  const fetchApplications = async () => {
    try {
      const res = await fetch("/api/applications")
      if (res.ok) {
        const data = await res.json()
        setApplications(data)
      }
    } catch (err) {
      console.error("Failed to fetch applications:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company,
          position,
          url: url || null,
          status: appStatus,
          location: location || null,
          notes: notes || null,
        })
      })

      if (res.ok) {
        // reset form
        setCompany("")
        setPosition("")
        setUrl("")
        setLocation("")
        setNotes("")
        setShowForm(false)
        fetchApplications()
      }
    } catch (err) {
      console.error("Failed to create application:", err)
    }
  }

  const deleteApplication = async (id: string) => {
    if (!confirm("Delete this application?")) return
    
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: "DELETE"
      })
      
      if (res.ok) {
        fetchApplications()
      }
    } catch (err) {
      console.error("Failed to delete:", err)
    }
  }

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      })
      
      if (res.ok) {
        fetchApplications()
      }
    } catch (err) {
      console.error("Failed to update:", err)
    }
  }

  if (status === "loading" || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!session) {
    return null
  }

  // calculate stats
  const stats = {
    total: applications.length,
    applied: applications.filter(a => a.status === "APPLIED").length,
    interview: applications.filter(a => a.status === "INTERVIEW").length,
    offer: applications.filter(a => a.status === "OFFER").length,
    rejected: applications.filter(a => a.status === "REJECTED").length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Job Tracker</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{session.user?.email}</span>
            <button
              onClick={() => signOut()}
              className="text-sm text-red-600 hover:underline"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* stats */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">{stats.applied}</div>
            <div className="text-sm text-gray-600">Applied</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="text-2xl font-bold text-yellow-600">{stats.interview}</div>
            <div className="text-sm text-gray-600">Interview</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-600">{stats.offer}</div>
            <div className="text-sm text-gray-600">Offers</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            <div className="text-sm text-gray-600">Rejected</div>
          </div>
        </div>

        {/* add button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {showForm ? "Cancel" : "Add Application"}
          </button>
        </div>

        {/* form */}
        {showForm && (
          <div className="bg-white p-6 rounded-lg border mb-6">
            <h2 className="text-lg font-semibold mb-4">New Application</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Company</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Position</label>
                  <input
                    type="text"
                    required
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Job URL</label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  rows={3}
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Application
              </button>
            </form>
          </div>
        )}

        {/* applications list */}
        <div className="space-y-3">
          {applications.length === 0 ? (
            <div className="bg-white p-8 rounded-lg border text-center text-gray-500">
              No applications yet. Add one to get started.
            </div>
          ) : (
            applications.map((app) => (
              <div key={app.id} className="bg-white p-4 rounded-lg border">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{app.position}</h3>
                    <p className="text-gray-600">{app.company}</p>
                    {app.location && <p className="text-sm text-gray-500">{app.location}</p>}
                    {app.notes && <p className="text-sm text-gray-600 mt-2">{app.notes}</p>}
                    {app.url && (
                      <a href={app.url} target="_blank" className="text-sm text-blue-600 hover:underline">
                        View posting
                      </a>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <select
                      value={app.status}
                      onChange={(e) => updateStatus(app.id, e.target.value)}
                      className="px-3 py-1 border rounded-md text-sm"
                    >
                      <option value="APPLIED">Applied</option>
                      <option value="INTERVIEW">Interview</option>
                      <option value="OFFER">Offer</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                    
                    <button
                      onClick={() => deleteApplication(app.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  Applied {new Date(app.appliedOn).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
