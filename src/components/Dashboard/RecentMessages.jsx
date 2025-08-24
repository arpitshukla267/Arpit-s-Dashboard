import React, { useState, useEffect } from "react";
import { Mail, Clock, Star } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const RecentMessages = () => {
  const { isDark } = useTheme();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/messages");
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("❌ Error fetching messages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "text-gray-400";
    }
  };

  // ✅ show max 3
  const displayedMessages = messages.slice(0, 2);

  const totalUnread = messages.filter(m => !m.isRead).length;
  const extraUnread = totalUnread - displayedMessages.filter(m => !m.isRead).length;

  return (
    <div
      className={`rounded-xl shadow-sm border p-6 transition-colors duration-200
        ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
            Recent Messages
          </h3>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Latest inquiries from your portfolio
          </p>
        </div>
        <a
          href="/messages"
          className={`text-sm font-medium ${
            isDark
              ? "text-blue-400 hover:text-blue-300"
              : "text-blue-600 hover:text-blue-700"
          }`}
        >
          View All
        </a>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading messages...</div>
      ) : (
        <div className="space-y-4">
          {displayedMessages.map((message) => (
            <div
              key={message._id}
              className={`border rounded-lg p-4 hover:shadow-md transition-all duration-200 
                ${isDark ? "border-gray-700" : "border-gray-200"} 
                ${
                  !message.isRead
                    ? isDark
                      ? "bg-blue-900/10 border-blue-800"
                      : "bg-blue-50 border-blue-200"
                    : ""
                }`}
            >
              {/* Top Row */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {message.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                      {message.name}
                    </h4>
                    <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      {message.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className={`h-4 w-4 ${getPriorityColor(message.priority)}`} />
                  {!message.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                </div>
              </div>

              {/* Subject + Message */}
              <div className="mb-3">
                <h5
                  className={`font-medium text-sm mb-1 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {message.subject}
                </h5>
                <p className={`text-sm line-clamp-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {message.message}
                </p>
              </div>

              {/* Footer Row */}
              <div className="flex items-center justify-between">
                <div
                  className={`flex items-center space-x-1 text-xs ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <Clock className="h-3 w-3" />
                  <span>{message.time}</span>
                </div>
                <a
                  href={`/messages/${message._id}`}
                  className={`text-xs font-medium ${
                    isDark
                      ? "text-blue-400 hover:text-blue-300"
                      : "text-blue-600 hover:text-blue-700"
                  }`}
                >
                  Reply
                </a>
              </div>
            </div>
          ))}

          {messages.length === 0 && (
            <div className="text-center py-8 text-gray-500">No recent messages</div>
          )}
        </div>
      )}

      {/* Footer Banner */}
      <div
        className={`mt-6 p-4 rounded-lg border flex items-center space-x-3 transition-colors duration-200
          ${
            isDark
              ? "from-blue-900/20 to-purple-900/20 border-blue-800 bg-gradient-to-r"
              : "from-blue-50 to-purple-50 border-blue-200 bg-gradient-to-r"
          }`}
      >
        <Mail className={`h-5 w-5 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
        <div>
          <p className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
            {totalUnread} unread messages
          </p>
          <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {extraUnread > 0
              ? `+${extraUnread} more unread messages`
              : "You have new inquiries waiting for response"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecentMessages;
