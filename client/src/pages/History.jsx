import React, { useState, useEffect } from 'react';
import { getHistory } from '../api/history';
import DynamicIcon from '../components/DynamicIcon';

export default function History() {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);

  const tabs = ['All', 'Pending', 'In Progress', 'Completed'];

  useEffect(() => {
    getHistory().then((data) => {
      setRequests(data);
      setFilteredRequests(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (activeTab === 'All') {
      setFilteredRequests(requests);
    } else {
      setFilteredRequests(requests.filter(r => r.status.toLowerCase() === activeTab.toLowerCase()));
    }
  }, [activeTab, requests]);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed':
        return 'text-slate-600 bg-slate-100 border-slate-200';
      case 'In Progress':
        return 'text-sky-600 bg-sky-50 border-sky-100';
      case 'Pending':
      default:
        return 'text-amber-600 bg-amber-50 border-amber-100';
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-slate-900">Service Request History</h1>
          <p className="text-sm text-slate-500 mt-1">Track the status of all your online and agent-assisted digital services.</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex bg-white border border-slate-200 p-1 rounded-xl w-fit mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === tab
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-650 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Requests List */}
        {loading ? (
          <div className="space-y-4">
            {Array(3).fill(0).map((_, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-150 animate-pulse h-20"></div>
            ))}
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center">
            <DynamicIcon name="FileText" className="mx-auto h-12 w-12 text-slate-350 mb-3" />
            <p className="text-base text-slate-500 font-semibold mb-1">No requests found</p>
            <p className="text-xs text-slate-400">You do not have any transaction matching this status.</p>
          </div>
        ) : (
          <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
            <div className="divide-y divide-slate-100">
              {filteredRequests.map((request) => (
                <div key={request.refId} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                  
                  {/* Service info */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                      <DynamicIcon name={request.icon} className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{request.serviceTitle}</h3>
                      <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                        <span>Ref: {request.refId}</span>
                        <span>•</span>
                        <span>{request.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Status / Amount */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 sm:text-right">
                    
                    {/* Amount & Mode */}
                    <div>
                      <p className="text-sm font-bold text-slate-950">₹ {request.amount}</p>
                      <p className="text-[10px] text-slate-400 capitalize">{request.mode} payment</p>
                    </div>

                    {/* Status badge */}
                    <div>
                      <span className={`inline-flex items-center text-xs font-bold border px-3 py-1 rounded-full ${getStatusStyle(request.status)}`}>
                        {request.status}
                      </span>
                    </div>

                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
