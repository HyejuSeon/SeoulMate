import { Injectable } from '@nestjs/common';
import axios from 'axios'

@Injectable()
export class AiService {
    async getData(url) {
        try {const body = { url: url.url }
        const {data} = await axios({
            method: 'post',
            url: 'http://kdt-ai4-team07.elicecoding.com:5002/',
            data: body,
        });
        return data
    } catch (err) {
        console.log(err) 
    }
    }
}
