import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
    async getData(url) {
        const response = await fetch("http://kdt-ai4-team07.elicecoding.com:5002/", {
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ url: url.url }),
        })
        return response.json();
    }
}
