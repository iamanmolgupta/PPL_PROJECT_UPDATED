import Axios from "axios"

const baseUrl = "http://localhost:8080";
const callApi = (options)=>{
    return new Promise((resolve,rej)=>{
        let option = {...options};
        option.url = `${baseUrl}/${option.url}`
    Axios({...option}).then(response=>{
        resolve(response);
    }).catch(err=>{
        rej(err);
    })
    })
}

export default callApi