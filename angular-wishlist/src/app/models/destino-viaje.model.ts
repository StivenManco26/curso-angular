export class DestinoViaje{
	private selected: boolean;
	servicios: string[];
	constructor(public n:string, public u:string){
		this.servicios = ['Piscina', 'Desayuno'];
	}
	isSelected(): boolean{
		return this.selected;
	}
	setSelected(s:boolean){
		this.selected = s;
	}
}