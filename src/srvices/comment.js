import api from './api';

const path = 'comment';

const getByTodoId = (todoId) => new Promise((resolve, reject) => {
    api.get(path).then(({data}) => resolve(data.filter(d => d.todoId === todoId))).catch(e => reject(e))
})

const create = (data) => new Promise((resolve, reject) => {
    api.post(path, data).then(r => resolve(r.data)).catch(e => reject(e))
})

const CommentService = {
    create,
    getByTodoId
}

export default CommentService