import * as Models from "./Models"

export class Api {
    base_url: string;
    token: Promise<Models.Token>|null;

    constructor(url?: string) {
        this.base_url = url || 'https://fir.tuffsruffs.se/api';
        this.token = null;
    }

    async get(path: string) {
        return await(await fetch(this.base_url + path)).json()
    };

    async post(path: string, data: any) {
        const formData = new FormData();
        for(const datakey in data) {
            if (data.hasOwnProperty(datakey)) {
                formData.append(datakey, data[datakey]);
            }
        }
        const options: RequestInit = {
            method: 'POST',
            body: formData
        };
        return await(await fetch(this.base_url + path, options)).json()
    };

    async game(id: number): Promise<Models.Game> {
        return this.get(`/game/${id}`);
    };

    async grid(id: number): Promise<Models.PawnState[][]> {
        return this.get(`/game/${id}/grid`);
    };

    async pawns(id: number): Promise<Models.Pawn[]> {
        return this.get(`/game/${id}/pawns`);
    };

    async player(id: number): Promise<Models.Player> {
        return this.get(`/player/${id}`);
    };

    async games(id: number): Promise<Models.Game[]> {
        return this.get(`/player/${id}/games`);
    };

    async auth(username: string): Promise<Models.Token> {
        return this.token = this.post('/player/auth', {username});
    };

    async addPlayer(id: number, username: string): Promise<Models.Token> {
        return this.token = this.post('/player/add', {username});
    };

    async whoami(): Promise<Models.Player> {
        if(this.token === null) throw new Error('Not logged in');
        return this.post('/whoami', {token: (await this.token).Token});
    }

    async nextGame(): Promise<Models.Game> {
        if(this.token === null) throw new Error('Not logged in');
        return this.post('/whoami/game', {token: (await this.token).Token});
    }

    async addGame(opponent: string): Promise<Models.Game> {
        if(this.token === null) throw new Error('Not logged in');
        return this.post('/game/add', {token: (await this.token).Token, opponent});
    }

    async play(game_id: number, x: number, y: number): Promise<Models.Game> {
        if(this.token === null) throw new Error('Not logged in');
        return this.post(`/play/${game_id}/${x}/${y}`, {token: (await this.token).Token});
    }
}
