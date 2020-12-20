export class ListaPokemon {
  id: string = '';
  name: string = '';
  url: string = '';
  imageURL: string = '';

  static parse(data:any) {
    let pokemon = Object.assign(new ListaPokemon(), data);
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
    this.imageURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + this.id + ".png";
  }
}
