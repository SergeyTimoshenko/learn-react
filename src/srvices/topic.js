import api from './api';

const path = 'topic'

const create = (topic) => new Promise((resolve, reject) => {
    api.post(path, topic).then(res => resolve(res.data)).catch(err => reject(err))
})

const fetchAll = () => new Promise((resolve, reject) => {
    api.get(path).then(res => resolve(res.data)).catch(err => reject(err))
})

const update = (id, params) => new Promise((resolve, reject) => {
    let pathId = `${path}/${id}`;
    api.put(pathId, params).then(res => resolve(res.data)).catch(err => reject(err))
})

const del = (id) => new Promise((resolve, reject) => {
    let pathId = `${path}/${id}`;
    api.del(pathId).then(res => resolve(res.data)).catch(err => reject(err))
})

const TopicService = {
    create,
    fetchAll,
    update,
    del
}

export default TopicService