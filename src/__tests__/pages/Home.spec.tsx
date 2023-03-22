import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { Home } from '../../pages/Home';
import { Alert } from 'react-native';

describe('Home', () => {
  it('should be able to render new added tasks', () => {
    const { getByTestId, getByPlaceholderText, getByText } = render(<Home />);
    const inputElement = getByPlaceholderText('Adicionar novo todo...');

    expect(getByText('0 tarefas'));

    fireEvent.changeText(inputElement, 'Primeira tarefa');
    fireEvent(inputElement, 'submitEditing');

    const input = getByTestId('input-0');

    expect(input.props.value).toBe('Primeira tarefa');
    expect(getByText('1 tarefa'));

    fireEvent.changeText(inputElement, 'Segunda tarefa');
    fireEvent(inputElement, 'submitEditing');

    const input1 = getByTestId('input-1');


    expect(input.props.value).toBe('Primeira tarefa');
    expect(input1.props.value).toBe('Segunda tarefa');
    expect(getByText('2 tarefas'));
  });

  it('should be able to render tasks as done and undone', () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(<Home />);
    const inputElement = getByPlaceholderText('Adicionar novo todo...');

    fireEvent.changeText(inputElement, 'Primeira tarefa');
    fireEvent(inputElement, 'submitEditing');

    const buttonElement = getByTestId('button-0');
    const markerElement = getByTestId('marker-0');

    const taskElement = getByTestId('input-0');

    expect(buttonElement).toHaveStyle({
      flex: 1,
      paddingHorizontal: 24,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    });
    expect(markerElement).toHaveStyle({
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15
    });
    expect(taskElement).toHaveStyle({
      color: '#666',
    });

    fireEvent.press(taskElement);

    expect(markerElement).toHaveStyle({
      backgroundColor: '#1DB863'
    });
    expect(taskElement).toHaveStyle({
      color: '#1DB863',
      textDecorationLine: 'line-through'
    });
  });

  // it('should be able to remove tasks after the trash icon was pressed', async () => {
  //   const { getByPlaceholderText, getByText, getByTestId, queryByText } = render(<Home />);
  //   const inputElement = getByPlaceholderText('Adicionar novo todo...');

  //   fireEvent.changeText(inputElement, 'Primeira tarefa');
  //   fireEvent(inputElement, 'submitEditing');

  //   fireEvent.changeText(inputElement, 'Segunda tarefa');
  //   fireEvent(inputElement, 'submitEditing');

  //   const firstTaskTrashIcon = getByTestId('trash-0');

  //   fireEvent(firstTaskTrashIcon, 'press');
  //   // const inputAlert = getByText('Tem certeza que você deseja remover esse item?');
  //   // fireEvent(inputAlert, 'Sim');

  //   expect(queryByText('Primeira tarefa')).toBeNull();
  //   const taskElement = getByTestId('input-1');
  //   expect(taskElement.props.value).toBe('Segunda tarefa');
  //   expect(getByText('1 tarefa'));
});
})