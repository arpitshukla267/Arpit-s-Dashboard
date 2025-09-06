import React, { useState, useEffect } from 'react';
import {
  Search, Filter, Mail, MailOpen, Star
} from 'lucide-react';
import MessageCard from '../components/Messages/MessageCard';
import MessageDetail from '../components/Messages/MessageDetail';
import { useTheme } from '../contexts/ThemeContext';
import FilterDropdown from '../components/UI/FilterDropdown';

const API_BASE = "https://arpit-s-dashboard-backend.onrender.com/api"; // ✅ Use deployed backend

const Messages = () => {
  const { isDark } = useTheme();
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all messages
  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API_BASE}/messages`);
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error("❌ Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // ✅ Toggle read/unread
  const handleToggleRead = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/messages/${id}/toggle-read`, {
        method: "PATCH",
      });
      const updated = await res.json();
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? updated.data : m))
      );
    } catch (err) {
      console.error("❌ Error toggling read:", err);
    }
  };

  // ✅ Toggle star/unstar
  const handleToggleStar = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/messages/${id}/toggle-star`, {
        method: "PATCH",
      });
      const updated = await res.json();
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? updated.data : m))
      );
    } catch (err) {
      console.error("❌ Error toggling star:", err);
    }
  };

  // ✅ Delete message
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE}/messages/${id}`, {
        method: "DELETE",
      });
      setMessages((prev) => prev.filter((m) => m._id !== id));
      if (selectedMessage === id) setSelectedMessage(null);
    } catch (err) {
      console.error("❌ Error deleting message:", err);
    }
  };

  // ✅ Filter messages by search + status
  const filteredMessages = messages.filter(message => {
    const matchesSearch =
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesFilter = true;
    switch (filterStatus) {
      case 'unread':
        matchesFilter = !message.isRead;
        break;
      case 'starred':
        matchesFilter = message.isStarred;
        break;
      case 'high':
        matchesFilter = message.priority === 'high';
        break;
      default:
        matchesFilter = true;
    }

    return matchesSearch && matchesFilter;
  });

  // ✅ Sort so starred messages always appear first
  const sortedMessages = [...filteredMessages].sort((a, b) => {
    if (a.isStarred && !b.isStarred) return -1;
    if (!a.isStarred && b.isStarred) return 1;
    return new Date(b.createdAt) - new Date(a.createdAt); // newest first
  });

  const unreadCount = messages.filter(m => !m.isRead).length;
  const starredCount = messages.filter(m => m.isStarred).length;

  return (
    <div className={`space-y-6 transition-colors fixed duration-200 ${isDark ? 'bg-gray-900' : 'bg-gray-50'} p-4 sm:p-6`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Messages</h1>
          <p className={`text-gray-600 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Portfolio inquiries and communications ({unreadCount} unread)
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <div className={`flex items-center space-x-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <Mail className="h-4 w-4" />
            <span>{unreadCount} unread</span>
          </div>
          <div className={`flex items-center space-x-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <Star className="h-4 w-4" />
            <span>{starredCount} starred</span>
          </div>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className={`rounded-xl shadow-sm border p-6 transition-colors duration-200 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 border ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
            {/* Filter */}
<FilterDropdown
  filterStatus={filterStatus}
  setFilterStatus={setFilterStatus}
  isDark={isDark}
/>
          </div>
        </div>
      </div>

      {/* Messages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-1 overflow-y-auto max-h-[70vh] no-scrollbar">
          {loading ? (
            <div className="text-center py-10 text-gray-500">Loading messages...</div>
          ) : (
            <div className="space-y-4 mb-28">
              {sortedMessages.map((message) => (
                <MessageCard
                  key={message._id}
                  message={message}
                  isSelected={selectedMessage === message._id}
                  onClick={() => {
                    setSelectedMessage(message._id);
                    if (!message.isRead) handleToggleRead(message._id); // mark as read when opened
                  }}
                  onToggleRead={() => handleToggleRead(message._id)}
                  onToggleStar={() => handleToggleStar(message._id)}
                  onDelete={() => handleDelete(message._id)}
                />
              ))}
              {sortedMessages.length === 0 && (
                <div className={`rounded-xl shadow-sm border p-12 text-center transition-colors duration-200 ${isDark ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-white border-gray-200 text-gray-600'}`}>
                  <Mail className="h-12 w-12 mx-auto mb-4" />
                  <div className="text-lg mb-2">No messages found</div>
                  <p>Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <MessageDetail
              message={messages.find(m => m._id === selectedMessage)}
              onClose={() => setSelectedMessage(null)}
              onToggleRead={() => handleToggleRead(selectedMessage)}
              onToggleStar={() => handleToggleStar(selectedMessage)}
              onDelete={() => handleDelete(selectedMessage)}
            />
          ) : (
            <div className={`rounded-xl shadow-sm border p-12 text-center transition-colors duration-200 ${isDark ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-white border-gray-200 text-gray-900'}`}>
              <MailOpen className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Select a message to read</h3>
              <p>Choose a message from the list to view its contents</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
