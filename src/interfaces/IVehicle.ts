export interface IVehicle {
  id: string;
  chassi: string;
  placa: string;
  marca: string;
  modelo: string;
  ano: number;
  cor: string;
  documento_crlv: string;
  cilindrada: number;
  criacaoData: Date;
  atualizacaoData: Date;
}
export interface ICreateVehicle {
  id: string;
  chassi: string;
  placa: string;
  marca: string;
  modelo: string;
  ano: number;
  cor: string;
  documento_crlv: string;
  cilindrada: number;
}
