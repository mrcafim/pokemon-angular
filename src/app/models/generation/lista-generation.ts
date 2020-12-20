export class ListaGeneration {
  id: string = '';
  name: string = '';
  url: string = '';

  static parse(data:any) {
    let pokemon = Object.assign(new ListaGeneration(), data);
    pokemon.getId();
    return pokemon;
  }

  getId() {
    const url = this.url;
    if (this.url) {
      const reg = this.url.match('([0-9]+)\/$');
      this.id = reg?.[1] as string;
    }
  }
}
