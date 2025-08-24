import React from 'react';
import { Clock, Star, Paperclip } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const MessageCard = ({ message, isSelected, onClick, onToggleStar }) => {
  const { isDark } = useTheme();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return isDark ? 'border-l-gray-600' : 'border-l-gray-300';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`border-l-4 ${getPriorityColor(message.priority)} 
        rounded-r-xl shadow-sm border p-4 cursor-pointer hover:shadow-md transition-all duration-200
        ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
        ${isSelected ? 'ring-2 ring-white shadow-md' : ''}
        ${!message.isRead ? (isDark ? 'bg-blue-900/10 border-blue-800' : 'bg-blue-50 border-blue-200') : ''}
      `}
    >
      {/* Top Section */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-medium">
              {message.name.charAt(0)}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <h4
              className={`font-medium truncate ${
                !message.isRead
                  ? isDark ? 'text-white' : 'text-gray-900'
                  : isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              {message.name}
            </h4>
            <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {message.email}
            </p>
          </div>
        </div>

        {/* Star + Unread Dot */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleStar(message._id);
            }}
            className={`transition-colors ${
              message.isStarred
                ? 'text-yellow-500'
                : isDark
                ? 'text-gray-400 hover:text-yellow-500'
                : 'text-gray-400 hover:text-yellow-500'
            }`}
          >
            <Star
              className="h-4 w-4"
              fill={message.isStarred ? 'currentColor' : 'none'}
            />
          </button>
          {!message.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
        </div>
      </div>

      {/* Message Preview */}
      <div className="mb-3">
        <h5
          className={`font-medium text-sm mb-1 line-clamp-1 ${
            !message.isRead
              ? isDark ? 'text-white' : 'text-gray-900'
              : isDark ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          {message.subject}
        </h5>
        <p className={`text-sm line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {message.message}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className={`flex items-center space-x-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <Clock className="h-3 w-3" />
          <span>{message.time || new Date(message.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center space-x-2">
          {Array.isArray(message.attachments) && message.attachments.length > 0 && (
            <div className={`flex items-center space-x-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <Paperclip className="h-3 w-3" />
              <span>{message.attachments.length}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
