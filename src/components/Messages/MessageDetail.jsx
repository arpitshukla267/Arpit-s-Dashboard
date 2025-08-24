import React from 'react';
import { X, Reply, Forward, Archive, Trash2, Star, Paperclip, Download } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext'; // ✅ import theme

const MessageDetail = ({ message, onClose }) => {
  const { isDark } = useTheme(); // ✅ get dark mode state

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return isDark
          ? 'bg-red-900/20 text-red-400'
          : 'bg-red-100 text-red-800';
      case 'medium':
        return isDark
          ? 'bg-yellow-900/20 text-yellow-400'
          : 'bg-yellow-100 text-yellow-800';
      case 'low':
        return isDark
          ? 'bg-green-900/20 text-green-400'
          : 'bg-green-100 text-green-800';
      default:
        return isDark
          ? 'bg-gray-900/20 text-gray-400'
          : 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      className={`rounded-xl shadow-sm border overflow-hidden transition-colors duration-200
        ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
    >
      <div className={`border-b p-6 transition-colors duration-200 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">{message.name.charAt(0)}</span>
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {message.name}
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {message.email}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`transition-colors ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {message.subject}
            </h2>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadge(message.priority)}`}>
              {message.priority} priority
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              className={`p-2 rounded-lg transition-colors ${
                message.isStarred
                  ? `text-yellow-500 ${isDark ? 'bg-yellow-900/20' : 'bg-yellow-50'}`
                  : `text-gray-400 hover:text-yellow-500 ${isDark ? 'hover:bg-yellow-900/20' : 'hover:bg-yellow-50'}`
              }`}
            >
              <Star className="h-4 w-4" fill={message.isStarred ? 'currentColor' : 'none'} />
            </button>
            <button className={`p-2 rounded-lg transition-colors ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-400 hover:bg-gray-50'}`}>
              <Archive className="h-4 w-4" />
            </button>
            <button className={`p-2 rounded-lg transition-colors ${isDark ? 'text-red-400 hover:bg-red-900/20' : 'text-gray-400 hover:text-red-600 hover:bg-red-50'}`}>
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className={`flex items-center justify-between text-sm transition-colors duration-200 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          <span>{message.date} at {message.time}</span>
          {!message.isRead && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-100 text-blue-800'}`}>
              Unread
            </span>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="prose dark:prose-invert max-w-none">
          <div className={`whitespace-pre-wrap leading-relaxed ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {message.message}
          </div>
        </div>

        {Array.isArray(message.attachments) && message.attachments.length > 0 && (
          <div className={`mt-6 pt-6 border-t transition-colors duration-200 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <h4 className={`text-sm font-medium mb-3 flex items-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <Paperclip className="h-4 w-4 mr-2" />
              Attachments ({message.attachments.length})
            </h4>
            <div className="space-y-2">
              {message.attachments.map((attachment, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg transition-colors duration-200 ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? 'bg-blue-900/20' : 'bg-blue-100'}`}>
                      <Paperclip className={`h-4 w-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {attachment}
                    </span>
                  </div>
                  <button className={`transition-colors duration-200 ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={`border-t p-6 transition-colors duration-200 ${isDark ? 'border-gray-700 bg-gray-700/50' : 'border-gray-200 bg-gray-50'}`}>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Reply className="h-4 w-4" />
            <span>Reply</span>
          </button>
          <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors duration-200 ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
            <Forward className="h-4 w-4" />
            <span>Forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageDetail;
