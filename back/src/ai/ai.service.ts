import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
    async getData(url) {
        const response = await fetch("http://localhost:5002/", {
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ url: url }),
        })
        return response.json();
    }
}
