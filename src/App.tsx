import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Plus, ChevronDown } from 'lucide-react';
import type { Environment } from './types/environment';
import { EnvironmentColumn } from './components/EnvironmentColumn';

type EnvironmentColumns = {
  [key: string]: Environment[];
};

const initialEnvironments: EnvironmentColumns = {
  staging: [
    {
      id: 'staging-1',
      name: 'staging',
      version: '0.7.0',
      deployStatus: 'up-to-date',
      type: 'staging'
    }
  ],
  production: [
    {
      id: 'prod-1',
      name: 'multi-tenant-prod',
      version: '0.6.0',
      deployStatus: 'upgrading',
      type: 'production'
    }
  ],
  lts: [
    {
      id: 'lts-1',
      name: 'cvs-health-prod',
      version: '0.6.0',
      deployStatus: 'up-to-date',
      type: 'lts'
    },
    {
      id: 'lts-2',
      name: 'jpmorgan-chase-prod',
      version: '0.6.0',
      deployStatus: 'up-to-date',
      type: 'lts'
    }
  ]
};

export default function App() {
  const [environments, setEnvironments] = useState<EnvironmentColumns>(initialEnvironments);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    setEnvironments(prevEnvironments => {
      const newEnvironments = { ...prevEnvironments };
      const sourceColumn = [...prevEnvironments[source.droppableId]];
      const destColumn = source.droppableId === destination.droppableId
        ? sourceColumn
        : [...prevEnvironments[destination.droppableId]];

      const [removed] = sourceColumn.splice(source.index, 1);
      destColumn.splice(destination.index, 0, removed);

      return {
        ...newEnvironments,
        [source.droppableId]: sourceColumn,
        [destination.droppableId]: destColumn,
      };
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-semibold">Startup Co.</h1>
              <nav className="flex items-center space-x-4">
                <button className="text-gray-400 hover:text-white px-3 py-2 rounded-md text-sm transition-colors duration-150">
                  Services
                </button>
                <button className="text-gray-400 hover:text-white px-3 py-2 rounded-md text-sm flex items-center transition-colors duration-150">
                  frontend-nextjs
                  <ChevronDown className="ml-2 w-4 h-4" />
                </button>
              </nav>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm flex items-center transition-colors duration-150">
              <Plus className="w-4 h-4 mr-2" />
              Deploy to new environment
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex space-x-4">
            <EnvironmentColumn
              id="staging"
              title="STAGING"
              environments={environments.staging}
            />
            <EnvironmentColumn
              id="production"
              title="PROD"
              environments={environments.production}
            />
            <EnvironmentColumn
              id="lts"
              title="LTS"
              environments={environments.lts}
            />
          </div>
        </DragDropContext>
      </main>
    </div>
  );
}