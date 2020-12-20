export class Generation {
    id: string = '';
    name: string = '';
    main_region: Region = new Region();
    pokemon_species: PokemonSpecies[] = [];

    static parse(data: any) {
        let pokemon = Object.assign(new Generation(), data);
        return pokemon;
    }
}

export class Region {
    name: string = '';
    url: string = '';
}

export class PokemonSpecies {
    name: string = '';
    url: string = '';
}
