import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import type { Environment } from '../types/environment';
import { EnvironmentCard } from './EnvironmentCard';
import clsx from 'clsx';

interface EnvironmentColumnProps {
  id: string;
  title: string;
  environments: Environment[];
}

export function EnvironmentColumn({ id, title, environments }: EnvironmentColumnProps) {
  return (
    <div className="flex-1 min-w-[300px] mx-2">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-300">{title}</h2>
      </div>
      
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={clsx(
              'min-h-[200px] p-4 rounded-lg transition-colors duration-200',
              'border border-gray-700',
              snapshot.isDraggingOver ? 'bg-gray-800/50' : 'bg-gray-800/30'
            )}
          >
            {environments.map((env, index) => (
              <EnvironmentCard
                key={env.id}
                environment={env}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}