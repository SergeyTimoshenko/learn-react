import api from './api';

const path = 'topic'

const create = (topic) => new Promise((resolve, reject) => {
    api.post(path, topic).then(res => resolve(res.data)).catch(err => reject(err))
})

const fetchAll = () => new Promise((resolve, reject) => {
    api.get(path).then(res => resolve(res.data)).catch(err => reject(err))
})

const TopicService = {
    create,
    fetchAll
}

export default TopicService