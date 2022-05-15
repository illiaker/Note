import { authHeader } from "../helpers";
import { userService } from "../services";

export const noteService = {
    getByUserId, edit, createNew, deleteNote, search
}

function getByUserId(){
    const user = localStorage.getItem('user');

    const requestOptions = {
        method: 'GET', 
        headers: authHeader()
    }

    return fetch(`${apiUrl}/api/note/getByUserId`, requestOptions).then(handleResponse)
               
}


function edit(noteModel){

    const data = {
        noteId: noteModel.id,
        text: noteModel.text, 
        title: noteModel.title
    }

    const headers = authHeader();
    headers['Content-Type'] = 'application/json'

    const requestOptions = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data)        
    }

    return fetch(`${apiUrl}/api/note/edit`, requestOptions).then(handleResponse)
}

function createNew(){
    const data = {
        text: "",
        title: "New note"
    }

    const headers = authHeader();
    headers['Content-Type'] = 'application/json'

    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)        
    }

    return fetch(`${apiUrl}/api/note/insert`, requestOptions).then(handleResponse)

}

function deleteNote(id){
    const formData = new FormData();
    formData.append('id', id);

    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
        body: formData
    }

    return fetch(`${apiUrl}/api/note/delete`, requestOptions).then(handleResponse)
}


function search(searchString){
    
    if(!searchString){
        return getByUserId();
    }
    const requestOptions = {
        method: 'GET',
        headers: authHeader()        
    }

    return fetch(`${apiUrl}/api/note/search/${searchString}`, requestOptions).then(handleResponse)
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                
                userService.logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}