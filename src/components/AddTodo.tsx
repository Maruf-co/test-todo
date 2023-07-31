import React, { useState } from 'react';
import { GoPlus } from 'react-icons/go';

import { Todo } from '../store';
import { todoStore } from '../App';

const useInputValue = (defaultValue: string) => {
  const [value, setValue] = useState(defaultValue);

  return {
    bind: {
      value,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value),
    },
    clear: () => setValue(''),
    value: () => value,
  };
};

const AddTodo: React.FC = () => {
  const style = {
    container: 'flex mb-4 mt-8',
    input: `rounded-l-md border py-1.5 px-3 hover:bg-gray-100 
      focus:border-green-600 focus:ring-0 focus:outline-none`,
    button: 'rounded-r-md bg-green-600 text-white text-4xl hover:bg-green-700',
  };

  const input = useInputValue('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (input.value().trim()) {
      const todo = new Todo({ value: input.value() });

      todoStore.add(todo);
      input.clear();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.container}>
      <input {...input.bind} placeholder="Add new item..." className={style.input} />
      <button type="submit" className={style.button}>
        <GoPlus />
      </button>
    </form>
  );
};

export default AddTodo;
