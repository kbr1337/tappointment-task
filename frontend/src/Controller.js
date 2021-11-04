import axios from 'axios'

const API_URL = 'http://localhost:1337/api'

export const WriteToMemory = async (value) => {

    const res = await axios.post(API_URL, { Value: Number(value) })

    if (res.status !== 200) {
        alert("Couldn't save to memory!")
    }

    alert('Successfully saved to memory!')
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
