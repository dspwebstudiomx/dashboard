import Button from '@components/Botones/Button';
import Modal from '@components/Modal';
import React from 'react';
import { FaPlus } from 'react-icons/fa6';
import AddEditProjectTask from './AddEditProjectTask';
import ProjectTasksTable from './ProjectTasksTable';

const ProjectTasks = ({
	showTaskModal,
	setShowTaskModal,
	taskTitle,
	setTaskTitle,
	taskDescription,
	setTaskDescription,
	tasks,
	taskPriority,
	setTaskPriority,
	taskStatus,
	setTaskStatus,
	editTask,
	setEditTask,
	handleCreateTask,
	handleDeleteTask,
	handleEditTaskClick,
	handleEditTask,
	resetTaskForm,
	projectName, // Asegúrate de recibir projectName como prop
}) => {
	return (
		<>
			<h2 className="text-2xl font-semibold text-center uppercase mt-12">Tareas</h2>
			<ProjectTasksTable
				tasks={tasks}
				handleDeleteTask={handleDeleteTask}
				handleEditTaskClick={handleEditTaskClick}
				handleEditTask={handleEditTask}
				setEditTask={setEditTask}
				setShowTaskModal={setShowTaskModal}
				projectName={projectName}
				setTaskTitle={setTaskTitle}
				setTaskDescription={setTaskDescription}
				setTaskPriority={setTaskPriority}
				setTaskStatus={setTaskStatus}
				taskTitle={taskTitle}
				taskDescription={taskDescription}
				taskPriority={taskPriority}
				taskStatus={taskStatus}
				editTask={editTask}
				resetTaskForm={resetTaskForm}
			/>
			<AddEditProjectTask
				showTaskModal={showTaskModal}
				setShowTaskModal={setShowTaskModal}
				taskTitle={taskTitle}
				setTaskTitle={setTaskTitle}
				taskDescription={taskDescription}
				setTaskDescription={setTaskDescription}
				taskPriority={taskPriority}
				setTaskPriority={setTaskPriority}
				taskStatus={taskStatus}
				setTaskStatus={setTaskStatus}
				editTask={editTask}
				setEditTask={setEditTask}
				handleCreateTask={handleCreateTask}
				handleEditTask={handleEditTask}
				resetTaskForm={resetTaskForm}
				projectName={projectName}
				tasks={tasks}
				handleEditTaskClick={handleEditTaskClick}
				handleDeleteTask={handleDeleteTask}
			/>
		</>
	);
};

export default ProjectTasks;
