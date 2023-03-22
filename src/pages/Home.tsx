import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';


export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const newTask = {
      id: Number(tasks.length + 1),
      title: newTaskTitle,
      done: false
    } as Task

    setTasks([...tasks, newTask])
  }

  function handleToggleTaskDone(id: number) {
    const findTask = tasks.find(task => task.id === id) as Task
    findTask.done = !findTask.done
    const updateTask = tasks.map(task => ({ ...task }))
    setTasks(updateTask)

  }

  function handleRemoveTask(id: number) {
    const findTask = tasks.filter(task => task.id !== id)

    setTasks(findTask)

  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})