import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Settings, Terminal, Circle } from 'lucide-react';
import type { Environment } from '../types/environment';
import clsx from 'clsx';

interface EnvironmentCardProps {
  environment: Environment;
  index: number;
}

const getStatusColor = (status: Environment['deployStatus']) => {
  switch (status) {
    case 'up-to-date':
      return 'text-emerald-500';
    case 'upgrading':
      return 'text-blue-500';
    case 'failed':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

export function EnvironmentCard({ environment, index }: EnvironmentCardProps) {
  return (
    <Draggable draggableId={environment.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={clsx(
            'bg-gray-900 rounded-lg p-4 mb-4 border border-gray-700',
            'transition-all duration-200 ease-in-out',
            snapshot.isDragging ? 'shadow-lg scale-105' : ''
          )}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Circle className="w-4 h-4 text-emerald-500" />
              <span className="text-gray-300">{environment.name}</span>
            </div>
            <span className="text-gray-500">{environment.version}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Deploy Status:</span>
              <span className={clsx('text-sm', getStatusColor(environment.deployStatus))}>
                {environment.deployStatus}
              </span>
            </div>
            
            <div className="flex space-x-2">
              <button 
                className="p-2 hover:bg-gray-800 rounded transition-colors duration-150"
                aria-label="View Logs"
              >
                <Terminal className="w-4 h-4 text-gray-400" />
              </button>
              <button 
                className="p-2 hover:bg-gray-800 rounded transition-colors duration-150"
                aria-label="Settings"
              >
                <Settings className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}