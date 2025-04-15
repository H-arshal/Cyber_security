import axios from 'axios'

const URL = "http://localhost:8080";
export const encryptPass = async (pt, algo) => {    
    try {
        const response = await axios.post(`${URL}/encrypt`, {
            plainText: pt,
            algo: algo
        });
        const ct = response.data.encryptedText;
        return ct;

    } catch (error) {
        console.error(error);
        throw error

    }
};

export const decryptPass = async (ct, algo) => {
    try {
        const response = await axios.post(`${URL}/decrypt`, {
            encryptedText: ct,
            algo: algo
        });
        const pt = response.data.decryptedText;
        return pt;
    } catch (error) {
        console.error(error);
        throw error

    }

}

