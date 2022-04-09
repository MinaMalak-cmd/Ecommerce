export interface IImage{
    src:string;
    alt:string;
}
export interface IProduct{
    name: string;
    category: string;
    price: number;
    currency: string;
    image:IImage;
    bestseller:boolean;
    featured:boolean;
    details?:{
        description:string;
        weight:number;
        thickness:number;
        recommendations?:IImage[];
    }
}