import api from './api';

const path = 'todos';

const create = (param) => new Promise((resolve, reject) => {
    api.post(path, param).then(res => resolve(res.data)).catch(err => reject(err))
})

const fetchAll = () => new Promise((resolve, reject) => {
    api.get(path).then(r => resolve(r.data)).catch(err => reject(err))
})

const fetchById = (id) => new Promise((resolve, reject) => {
    let pathId = `${path}/${id}`
    api.get(pathId).then(res => resolve(res.data)).catch(err => reject(err))
})

const check = (id, status) => new Promise((resolve, reject) => {
    let pathId = `${path}/${id}`
    api.put(pathId, {status}).then(res => resolve(res.data)).catch(err => reject(err))
})

const del = (id) => new Promise((resolve, reject) => {
    let pathId = `${path}/${id}`
    api.del(pathId).then(res => resolve(res.data)).catch(err => reject(err))
})

const TodosService = {
    create,
    fetchAll,
    fetchById,
    check,
    del
}

export default TodosService;