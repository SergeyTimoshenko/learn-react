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

const fetchByToDoId = (id) => new Promise((resolve, reject) => {
    api.get(`${path}/task/${id}`).then(r => resolve(r.data)).catch(e => reject(e))
})

const check = (id, status) => new Promise((resolve, reject) => {
    let pathId = `${path}/${id}`
    api.put(pathId, {status}).then(res => resolve(res.data)).catch(err => reject(err))
})

const del = (id) => new Promise((resolve, reject) => {
    let pathId = `${path}/${id}`
    api.del(pathId).then(res => resolve(res.data)).catch(err => reject(err))
})

const update = (id, data) => new Promise((resolve, reject) => {
    let pathId = `${path}/${id}`
    api.update(pathId, data).then(r => resolve(r.data)).catch(e => reject(e))
})

const TodosService = {
    create,
    fetchAll,
    fetchById,
    check,
    del,
    update,
    fetchByToDoId
}

export default TodosService;