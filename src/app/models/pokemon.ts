export class Pokemon {
    id: string = '';
    name: string = '';
    url: string = '';
    imageURL: string = '';
    height: number = 0;
    weight: number = 0;
    order: string = '';
    base_experience: string = '';
    types: PokemonTypes[] = [];
    stats: PokemonStatus[] = [];

    static parse(data: any) {
        let pokemon = Object.assign(new Pokemon(), data);
        pokemon.getId();
        pokemon.getImageUrl();
        return pokemon;
    }

    getId() {
        const url = this.url;
        if (this.url) {
            const reg = this.url.match('([0-9]+)\/$');
            this.id = reg?.[1] as string;
        }
    }

    getImageUrl() {
        this.imageURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + this.id + ".png";
    }
}

export class PokemonStatus {
    base_stat: number = 0;
    effort: number = 0;
    stat: Stat = new Stat();
}


export class Stat {
    name: string = '';
    url: string = '';
}

export class PokemonTypes {
    slot: number = 0;
    type: Type = new Type();
}

export class Type {
    name: string = '';
    url: string = '';
}

