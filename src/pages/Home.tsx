import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export interface IEditTask {
  taskId: number;
  taskNewTitle: string
}


export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const findTask = tasks.find(task => task.title === newTaskTitle)

    if (findTask) {
      return Alert.alert("Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome")
    }

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
    Alert.alert("Remover item", "Tem certeza que você deseja remover esse item?", [
      {
        text: 'sim',
        onPress: () => setTasks(prevState => prevState.filter(task => task.id !== id))
      },
      {
        text: 'não',
        style: 'cancel'
      }
    ])
  }

  function handleEditTask({ taskId, taskNewTitle }: IEditTask) {

    const updateTask = tasks.map(task => ({ ...task }))

    const taskToBeUpdated = updateTask.find(task => task.id === taskId)

    if (!taskToBeUpdated) {
      return
    }

    taskToBeUpdated.title = taskNewTitle
    setTasks(updateTask)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
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