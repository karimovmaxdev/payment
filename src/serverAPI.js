import axios from "axios";

const URL = 'https://testforonboard.herokuapp.com'


export async function postData(data) {
    try {
        const response = await axios.post(`${URL}/transaction`, data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}