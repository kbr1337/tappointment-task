import axios from 'axios'

const API_URL = 'http://localhost:1337/api'

export const WriteToMemory = async (value) => {

    try {
        await axios.post(API_URL, { Value: Number(value) })
        return alert('Successfully saved to memory!')
    } catch (err) {
        // console.error(err)
        return alert("Couldn't save to memory!")
    }

}

export const LoadFromMemory = async () => {

    try {
        const res = await axios.get(API_URL)
        return res.data.Value
    } catch (err) {
        // console.error(err)
        return "Couldn't load from memory!"
    }


}
