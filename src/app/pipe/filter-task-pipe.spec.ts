import {FilterTaskPipe} from './filter-task-pipe';
import {Todo} from '../todo-list/interfaces/todo';

describe('FilterTaskPipe', () => {
    const pipe = new FilterTaskPipe();
    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('transforms "inputArray" to "expectedArray" based on filters', () => {
        const inputArray: Todo[] = [
            {
                id: 17,
                description: 'Nueva tarea',
                status: 0,
                id_author: 1,
                finish_at: '2022-06-03T21:47:23.000Z',
                created_at: '2022-06-24T00:54:29.000Z'
            },
            {
                id: 18,
                description: 'Una tarea mas',
                status: 0,
                id_author: 1,
                finish_at: '2022-06-03T21:47:23.000Z',
                created_at: '2022-06-24T00:59:56.000Z'
            },
            {
                id: 20,
                description: 'Una tarea mas',
                status: 0,
                id_author: 1,
                finish_at: '2022-06-03T21:47:23.000Z',
                created_at: '2022-06-24T14:12:18.000Z'
            },
            {
                id: 27,
                description: 'Una tarea mas 1',
                status: 0,
                id_author: 1,
                finish_at: '2022-06-03T21:47:23.000Z',
                created_at: '2022-06-24T14:23:41.000Z'
            },
            {
                id: 34,
                description: 'Una tarea mas',
                status: 0,
                id_author: 1,
                finish_at: '2022-06-03T21:47:23.000Z',
                created_at: '2022-06-24T14:30:26.000Z'
            },
            {
                id: 38,
                description: 'Una tarea mas',
                status: 0,
                id_author: 1,
                finish_at: '2022-06-03T21:47:23.000Z',
                created_at: '2022-06-24T14:30:45.000Z'
            },
            {
                id: 57,
                description: 'dsd',
                status: 0,
                id_author: 1,
                finish_at: '2222-02-22T00:00:00.000Z',
                created_at: '2022-06-24T14:49:01.000Z'
            },
            {
                id: 64,
                description: 'Una tarea mas',
                status: 0,
                id_author: 1,
                finish_at: '2022-06-03T21:47:23.000Z',
                created_at: '2022-06-24T14:50:28.000Z'
            },
            {
                id: 77,
                description: 'Una tarea mas',
                status: 0,
                id_author: 1,
                finish_at: '2022-06-03T21:47:23.000Z',
                created_at: '2022-06-24T15:03:40.000Z'
            },
            {
                id: 79,
                description: 'Una tarea mas',
                status: 0,
                id_author: 1,
                finish_at: '2022-06-03T21:47:23.000Z',
                created_at: '2022-06-24T15:05:20.000Z'
            },
            {
                id: 80,
                description: 'Una tarea mas',
                status: 0,
                id_author: 1,
                finish_at: '2022-06-03T21:47:23.000Z',
                created_at: '2022-06-24T15:05:48.000Z'
            },
            {
                id: 81,
                description: 'Una tarea mas',
                status: 0,
                id_author: 1,
                finish_at: '2022-06-03T21:47:23.000Z',
                created_at: '2022-06-24T15:05:51.000Z'
            }
        ];
        const taskFilter = 'Una tarea mas 1';

        const expectArray: Todo[] = [
            {
                id: 27,
                description: 'Una tarea mas 1',
                status: 0,
                id_author: 1,
                finish_at: '2022-06-03T21:47:23.000Z',
                created_at: '2022-06-24T14:23:41.000Z'
            },
        ];

        expect(pipe.transform(inputArray, taskFilter)).toStrictEqual(expectArray);
    });

});
