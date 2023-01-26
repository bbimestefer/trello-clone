const CREATE = 'lists/CREATE'
const LOAD = 'lists/LOAD'
const UPDATE = 'lists/UPDATE'
const DELETE = 'lists/CREATE'

const create = list => ({
    type: CREATE,
    list
})

const load = lists => ({
    type: LOAD,
    lists
})

const update = list => ({
    type: UPDATE,
    list
})

const remove = id => ({
    type: DELETE,
    id
})


export const getAllLists = (boardId) => async dispatch => {
    console.log("BOARD ID IN THE THUNK", boardId)
    const response = await fetch(`/api/boards/${boardId}/lists`)

    if(response.ok){
        const lists = await response.json()
        console.log("THE LISTS IN THE RESPONSE", lists)
        dispatch(load(lists))
        return lists
    }
}


export const createList = (list) => async dispatch => {
    const response = await fetch(`/api/lists/new`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(list)
      })

    if(response.ok){
        const list = await response.json()
        dispatch(create(list))
        return list
    }
}


export const updateList = (list) => async dispatch => {
    const response = await fetch(`/api/lists/${list.id}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(list)
      })

    if(response.ok){
        const list = await response.json()
        dispatch(update(list))
        return list
    }
}


export const removeList = (listId) => async dispatch => {
    const response = await fetch(`/api/lists/${listId}`, {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"},
      })

    if(response.ok){
        const list = await response.json()
        dispatch(remove(listId))
        return list
    }
}

const initialState = { lists: {} }

export default function reducer (state = initialState, action) {
    let newState;
    switch(action.type){
        case CREATE:
            return {...state, lists: {...state.lists, [action.list.id]: action.list} }
        case LOAD:
            newState = {...state, lists: {} }
            action.lists.Lists.forEach(list => {
                newState.lists[list.id] = list
            });
            return newState
        case UPDATE:
            newState = {...state, lists: { ...state.lists, [action.list.id]: action.list } }
            if(newState.singlelist[action.list.id]) newState.singlelist[action.list.id] = action.list
            return newState
        case DELETE:
            newState = {...state, lists: {...state.lists } }
            if(newState.lists[action.id]) delete newState.lists[action.id]
            return newState
        default:
            return state
    }
}
